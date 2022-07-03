import React, {Component, Fragment} from 'react';
import Menu from "../components/Menu";

class Course extends Component {
    constructor() {
        super();
        this.state={
            dataList:[],
            isLoading:true,
            isError:false,
            rowDataId:"",
            deleteBtnText:"Delete"
        }
        this.DataDelete=this.DataDelete
    }
    render() {
        return (
            <Fragment>
                <Menu>
                    <h1>Course Page</h1>
                </Menu>

            </Fragment>
        );
    }
}

export default Course;
