import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import Clock from "react-live-clock";
import "./WebcamValidator.css";
import axios from "axios";
import { storage } from "../../../firebase";
import Progress from "../../../common/ProgressBar/progress";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/EmployeeActions";
import date from 'date-and-time';

function WebcamValidator(props) {
  //states for webcam
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState("");

  //states for send image to firebase
  const [imageURL, setImageURL] = useState("");
  const [uploadPercentage, setuploadPercentage] = useState(0);

  const [retake, setRetake] = useState(false);

  //states for send backend data
  const [userId, setuserId] = useState("");
  const [StateOfProcess, setStateOfProcess] = useState("");

  //method for capture an image Destop
  const captureImage = React.useCallback(async () => {
    const imageSrc = await webcamRef.current.getScreenshot();
    setRetake(true);
    setImgSrc(imageSrc);
    uploadImage(imageSrc);
    //console.log(imageSrc);
  }, [webcamRef, setImgSrc]);

  async function uploadImage(imgSrc) {
    if (imgSrc !== null) {
      setStateOfProcess("Uploading...");
      const fileName = Math.floor(Math.random() * 100000 + 1) + ".jpg";
      const uploadTask = storage
        .ref(`facelogin/${fileName}`)
        .putString(imgSrc, "data_url", { contentType: "image/jpeg" });
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //progress function
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setuploadPercentage(progress);
        },
        (error) => {
          //error function
          console.log(error);
        },
        () => {
          //complete function
          storage
            .ref("facelogin")
            .child(fileName)
            .getDownloadURL()
            .then((urlFirebase) => {
              setImageURL(urlFirebase);

              const config = {
                headers: {
                  "Content-Type": "application/json",
                  "Ocp-Apim-Subscription-Key":
                    "cc8d3f8f4b23401c9e3b36474ecce84d",
                },
              };

              const newImageDetails = {
                url: urlFirebase,
              };

              axios
                .post(
                  "https://eastus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&recognitionModel=recognition_03&returnRecognitionModel=false&detectionModel=detection_02&faceIdTimeToLive=86400",
                  newImageDetails,
                  config
                )
                .then(async (response) => {
                  setuserId(response.data[0].faceId);
                  setStateOfProcess("Processing...");

                  const newUserLogin = {
                    faceId: response.data[0].faceId,
                    largeFaceListId: "employeelist",
                    maxNumOfCandidatesReturned: 10,
                    mode: "matchPerson",
                  };

                  await axios
                    .post(
                      "https://eastus.api.cognitive.microsoft.com/face/v1.0/findsimilars",
                      newUserLogin,
                      config
                    )
                    .then((res) => {
                      setStateOfProcess("Please Wait...");
                      axios
                        .get(
                          process.env.REACT_APP_BACKEND_URL +
                            "/api/employee/confirmface/" +
                            res.data[0].persistedFaceId
                        )
                        .then(async (responseFromBackend) => {
                          console.log("id: " + res.data[0].persistedFaceId);
                          console.log(
                            "response backend : " +
                              responseFromBackend.data.persistedFaceId
                          );
                          if (
                            responseFromBackend.data.persistedFaceId ===
                            res.data[0].persistedFaceId
                          ) {
                            const now = new Date();
                            const attendenceObj = {
                              inTime:date.format(now, 'hh:mm A [GMT]Z'),
                              date:date.format(props.selectedDate, 'ddd, MMM DD YYYY'),
                            };
                            console.log(attendenceObj)
                            await setStateOfProcess(
                                  "Authenticated User : " +
                                    responseFromBackend.data.name
                                );

                            await props.confirmInTime(
                              responseFromBackend.data._id,
                              attendenceObj,
                              () => {
                                setStateOfProcess(
                                  "Attendence Added " +
                                    responseFromBackend.data.name
                                );
                                props.fetchEmployee();
                              },
                              () => {}
                            );

                          }
                        })
                        .catch(() => {
                          setStateOfProcess(
                            "Authentication Failed..Try Again..."
                          );
                        });
                    })
                    .catch(() => {
                      setStateOfProcess("Authentication Failed..Try Again...");
                    });
                })
                .catch((err) => {
                  alert(err.message);
                });
            });
        }
      );
    } else {
      alert("First You Must Select An Image");
    }
  }

  return (
    <div>
      <div className="row text-center">
        <div className="col-md-12">
          {retake ? (
            <img src={imgSrc} className="webcam" />
          ) : (
            <Webcam
              audio={false}
              ref={webcamRef}
              className="webcam"
              screenshotFormat="image/jpeg"
            />
          )}
        </div>
        <div className="col-md-12">
          <h1>
            <Clock format="HH:mm:ss" interval={1000} ticking={true} />
          </h1>

          {retake ? (
            <button
              className="btn webcamBtn"
              onClick={() => {
                setRetake(false);
              }}
            >
              Retake
            </button>
          ) : (
            <button className="btn webcamBtn" onClick={captureImage}>
              CONFIRM {props.timeSlot}
            </button>
          )}

          <div>
            <div class="form-group mt-2 mb-2">
            <h6>{StateOfProcess}</h6>
            </div>
            <div class="form-group">
              <Progress percentage={uploadPercentage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapActionToProps = {
  confirmInTime: actions.confirmInTime,
  fetchEmployee: actions.fetchEmployee
};

export default connect(null, mapActionToProps)(WebcamValidator);
