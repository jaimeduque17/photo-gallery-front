import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import AddAlbum from './pages/AddAlbum';
import AddPicture from './pages/AddPicture';
import Filters from './pages/Filters';
import Picture from './pages/Picture';
import ManagePictures from './pages/Managepictures';
import UpdatePicture from './pages/UpdatePicture';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/filters" exact component={Filters} />
                <Route path="/crud" exact component={Admin} />
                <Route path="/create/album" exact component={AddAlbum} />
                <Route path="/create/picture" exact component={AddPicture} />
                <Route path="/picture/:pictureId" exact component={Picture} />
                <Route path="/pictures" exact component={ManagePictures} />
                <Route path="/picture/update/:pictureId" exact component={UpdatePicture} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;