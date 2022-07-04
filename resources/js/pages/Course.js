import React, {Component, Fragment} from 'react';
import Menu from "../components/Menu";
import Axios from "axios";
import {Col, Row,Container} from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from "react-bootstrap-table2-paginator";
import LoadingDiv from "../components/loadingDiv";
import WentWrong from "../components/wentWrong";

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
        this.DataDelete=this.DataDelete.bind(this);
        this.ImgCellFormatter=this.ImgCellFormatter.bind(this);
    }

    componentDidMount() {
        Axios.get('/CourseList').then((response)=>{
            if(response.status==200){
                this.setState({dataList:response.data,isLoading:false,isError:false})
            }else{
                this.setState({isLoading:false,isError:true})
            }
        }).catch((error)=>{
            this.setState({isLoading:false,isError:true})
        });
    }

    DataDelete(){
        let confirmMessage=confirm("Do You Want to Delete?");
        if(confirmMessage===true){
            this.setState({deleteBtnText:"Deleting..."})
            Axios.post('/CourseDelete',{id:this.state.rowDataId}).then((response)=>{
                if(response.status==200 && response.data==1){
                    this.setState({deleteBtnText:"Data Deleted Successfully!"})
                    this.componentDidMount();
                    setTimeout(function(){
                        this.setState({deleteBtnText:"Delete"});
                    }.bind(this),2000);
                }else{
                    this.setState({deleteBtnText:"Data Not Deleted"})
                    setTimeout(function(){
                        this.setState({deleteBtnText:"Delete"});
                    }.bind(this),2000);
                }
            }).catch((error)=>{
                this.setState({deleteBtnText:"Data Not Deleted"})
                setTimeout(function(){
                    this.setState({deleteBtnText:"Delete"});
                }.bind(this),2000);
            });
        }
    }

    //Image Cell Formatter Method

    ImgCellFormatter(cell,row){
        return(
            <img className="table-cell-img" src={cell} />
        )
    }

    render() {
        if(this.state.isLoading==true){
            return(
                <Menu title="Courses">
                    <Container>
                        <LoadingDiv/>
                    </Container>
                </Menu>
            )
        }else if(this.state.isError==true){
            return(
                <Menu title="Courses">
                    <Container>
                        <WentWrong/>
                    </Container>
                </Menu>
            )
        }else{
            const data=this.state.dataList;
            const columns=[
                {dataField:'id',text:'ID'},
                {dataField:'small_img',text:'Image',formatter:this.ImgCellFormatter},
                {dataField:'short_title',text:'Title'},
                {dataField:'short_des',text:'Description'},
                // {dataField:'long_title',text:'Long Title'},
                // {dataField:'long_des',text:'Long Description'},
                {dataField:'total_lecture',text:'Total Lecture'},
                {dataField:'total_student',text:'Total Student'},
            ]

            const selectRow={
                mode:'radio',
                onSelect:(row,isSelect,rowIndex)=>{
                    this.setState({rowDataId:row['id']})
                }
            }

            return (
                <Fragment>
                    <Menu title="Courses">
                        <Container>
                            <Row>
                                <Col sm={12} md={12} lg={12}>
                                    <button onClick={this.DataDelete} className="normal-btn btn my-2">{this.state.deleteBtnText}</button>
                                    <BootstrapTable keyField='id' data={ data } columns={ columns } pagination={ paginationFactory() } selectRow={selectRow}/>
                                </Col>
                            </Row>
                        </Container>
                    </Menu>

                </Fragment>
            );
        }

    }
}

export default Course;
