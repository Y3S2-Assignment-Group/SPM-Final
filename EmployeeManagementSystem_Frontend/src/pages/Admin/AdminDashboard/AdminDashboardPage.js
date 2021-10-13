import React, { Component } from 'react'
import AdminDashboardCardSection from '../../../modules/AdminPageModules/AdminDashboardModules/AdminDashboardCardSection'
import AdminDashboardHeader from '../../../modules/AdminPageModules/AdminDashboardModules/AdminDashboardHeader'

export default class AdminDashboardPage extends Component {
    render() {
        return (
            <div>
            <div className="container">
              <div className="row">
                <div className="col-lg-12"><AdminDashboardHeader/></div>
                <div className="col-lg-12"><AdminDashboardCardSection/></div>
              </div>
            </div>
          </div>
        )
    }
}
