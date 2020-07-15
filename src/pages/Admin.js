import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Admin = () => {

    const adminLinks = () => (
        <div className="card">
            <h4 className="card-header text-center">Options</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link className="nav-link" to="/create/album">Create Album</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link" to="/create/picture">Create Picture</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link" to="/pictures">Manage Pictures</Link>
                </li>
            </ul>
        </div>
    );

    return (
        <Layout title="Create and manage your pictures" description={`Ready to make some modifications?`} className="container-fluid">
            <div className="row">
                <div className="col-3">
                    {adminLinks()}
                </div>
            </div>
        </Layout>
    );
}

export default Admin;