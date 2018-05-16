'use strict';

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from "./components/Layout";
import MainPage from "./components/main_page/MainPage";
import SearchPage from "./components/search_page/SearchPage";
import NotFoundPage from './components/NotFoundPage';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={MainPage}/>
    <Route path="/search" component={SearchPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;
