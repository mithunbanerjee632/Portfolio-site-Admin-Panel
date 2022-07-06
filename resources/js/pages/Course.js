import React, {Component, Fragment} from 'react';
import Menu from "../components/Menu";
import Axios from "axios";
import {Col, Row, Container, Modal, Button, Form} from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from "react-bootstrap-table2-paginator";
import LoadingDiv from "../components/loadingDiv";
import WentWrong from "../components/wentWrong";
import ReactQuill from "react-quill";

class Course extends Component {
    constructor() {
        super();
        this.state={
            dataList:[],
            isLoading:true,
            isError:false,
            rowDataId:"",
            deleteBtnText:"Delete",
            AddNewModalOpen:false,
            addTitle:"",
            addDes:"",
            addLongTitle:"",
            addLongDes:"",
            addLecture:"",
            addStudent:"",
            addSkill:"",
            addCourseLink:"",
            addImage:"",
            addVideo:""
        }
        this.DataDelete=this.DataDelete.bind(this);
        this.ImgCellFormatter=this.ImgCellFormatter.bind(this);

        this.AddNewModalOpen=this.AddNewModalOpen.bind(this)
        this.AddNewModalClose=this.AddNewModalClose.bind(this)

        this.onTitleChange=this.onTitleChange.bind(this)
        this.onDesChange=this.onDesChange.bind(this)
        this.onLongTitleChange=this.onLongTitleChange.bind(this)
        this.onLongDesChange=this.onLongDesChange.bind(this)
        this.onTotalLectureChange=this.onTotalLectureChange.bind(this)
        this.onTotalStudentChange=this.onTotalStudentChange.bind(this)
        this.onSkillChange=this.onSkillChange.bind(this)
        this.onCourseLinkChange=this.onCourseLinkChange.bind(this)
        this.onImageChange=this.onImageChange.bind(this)
        this.onVideoChange=this.onVideoChange.bind(this)
        this.addNewFormSubmit=this.addNewFormSubmit.bind(this)
    }

    AddNewModalOpen(){
        this.setState({AddNewModalOpen:true});


    }

    AddNewModalClose(){
        this.setState({AddNewModalOpen:false})
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

    //Form Data Pull
    onTitleChange(event){
       let title = event.target.value;
        this.setState({addTitle:title})
    }

    onDesChange(event){
        let des = event.target.value;
        this.setState({addDes:des})
    }

    onLongTitleChange(event){
        let LongTitle = event.target.value;
        this.setState({addLongTitle:LongTitle})
    }

    onLongDesChange(content, delta, source, editor){
        let LongDes = editor.getHTML();
        this.setState({addLongDes:LongDes})
    }

    onTotalLectureChange(event){
       let TotalLec = event.target.value;
        this.setState({addLecture:TotalLec})
    }

    onTotalStudentChange(event){
      let TotalStu = event.target.value;
        this.setState({addStudent:TotalStu})
    }

    onSkillChange(content, delta, source, editor){
        let skill = editor.getHTML();
        this.setState({addSkill:skill})
    }

    onCourseLinkChange(event){
       let CourseLink = event.target.value;
        this.setState({addCourseLink:CourseLink})
    }

    onImageChange(event){
      let image = event.target.files[0];
        this.setState({addImage:image})
    }


    onVideoChange(event){
      let video = event.target.files[0];
        this.setState({addVideo:video})
    }


    addNewFormSubmit(event){
        event.preventDefault();
        let title = this.state.addTitle;
        let des = this.state.addDes;
        let LongTitle = this.state.addLongTitle;
        let LongDes= this.state.addLongDes;
        let TotalLec = this.state.addLecture;
        let TotalStu= this.state.addStudent;
        let skill = this.state.addSkill;
        let CourseLink = this.state.addCourseLink;
        let image = this.state.addImage;
        let video = this.state.addVideo;

        let url = "/AddCourse";

        let MyFormData = new FormData();
        MyFormData.append('title',title)
        MyFormData.append('des',des)
        MyFormData.append('LongTitle',LongTitle)
        MyFormData.append('LongDes',LongDes)
        MyFormData.append('TotalLec',TotalLec)
        MyFormData.append('TotalStu',TotalStu)
        MyFormData.append('skill',skill)
        MyFormData.append('CourseLink',CourseLink)
        MyFormData.append('image',image)
        MyFormData.append('video',video)

        let config = {
            headers:{'content-type':'multipart/form-data'}
        }

        Axios.post(url,MyFormData,config).then((response)=>{
            if(response.data==1){
                this.AddNewModalClose();
                this.componentDidMount();
            }
        }).catch((error)=>{
           alert(error);
        });
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
                                    <button onClick={this.AddNewModalOpen} className="normal-btn ml-2 my-2  btn">Add New</button>
                                    <BootstrapTable keyField='id' data={ data } columns={ columns } pagination={ paginationFactory() } selectRow={selectRow}/>
                                </Col>
                            </Row>
                        </Container>
                    </Menu>

                    {/*Add New Modal*/}

                    <Modal show={this.state.AddNewModalOpen} onHide={this.AddNewModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add New Course</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.addNewFormSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Course Title</Form.Label>
                                    <Form.Control onChange={this.onTitleChange}  type="text" placeholder="Course Title" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Course Short Description</Form.Label>
                                    <Form.Control onChange={this.onDesChange}  type="text" placeholder="Course Short Description" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Course Long Title</Form.Label>
                                    <Form.Control onChange={this.onLongTitleChange}  type="text" placeholder="Course Long Title" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Course Long Description</Form.Label>
                                    <ReactQuill onChange={this.onLongDesChange} theme="snow" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Total Lecture</Form.Label>
                                    <Form.Control onChange={this.onTotalLectureChange} type="text" placeholder="Total Lecture" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Total Student</Form.Label>
                                    <Form.Control onChange={this.onTotalStudentChange} type="text" placeholder="Total Lecture" />
                                </Form.Group>


                                <Form.Group className="mb-3">
                                    <Form.Label>Skill</Form.Label>
                                    <ReactQuill onChange={this.onSkillChange} theme="snow" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Course Link</Form.Label>
                                    <Form.Control onChange={this.onCourseLinkChange} type="text" placeholder="Course Link" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Course Card Image</Form.Label>
                                    <Form.Control onChange={this.onImageChange}  type="file"/>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Course Video</Form.Label>
                                    <Form.Control onChange={this.onVideoChange}  type="file"/>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.AddNewModalClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>


                </Fragment>
            );
        }

    }
}

export default Course;
