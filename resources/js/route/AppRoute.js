import React, {Component, Fragment} from 'react';
import {Route, Routes} from "react-router";
import HomePage from "../pages/HomePage";
import ContactPage from "../pages/ContactPage";
import Course from "../pages/Course";
import Projects from "../pages/Projects";
import Services from "../pages/Services";
import ClientReview from "../pages/ClientReview";

class AppRoute extends Component {
    render() {
        return (
            <Fragment>
                <Routes>
                   <Route exact path="/" element={<HomePage />}/>
                   <Route  path="/contact" element={<ContactPage/>}/>
                   <Route  path="/course" element={<Course />}/>
                   <Route  path="/project" element={<Projects />}/>
                   <Route  path="/service" element={<Services />}/>
                   <Route  path="/review" element={<ClientReview />}/>
                </Routes>
            </Fragment>
        );
    }
}

export default AppRoute;
