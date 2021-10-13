import React, { Component } from 'react'
import AdminProjectsTable from '../../../modules/AdminPageModules/AdminProjectsTable/AdminProjectsTable'

export default class AdminProjectsPage extends Component {
    render() {
        return (
            <div className="container mt-5">
                <div className="text-center">
                <h1 className="text-center mt-4 commonTextColor">PROJECT MANAGEMENT</h1>                </div>
                <AdminProjectsTable/>
            </div>
        )
    }
}
