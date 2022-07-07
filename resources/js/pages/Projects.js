import React, {Component, Fragment} from 'react';
import Menu from "../components/Menu";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import Axios from "axios";
import paginationFactory from "react-bootstrap-table2-paginator";
import LoadingDiv from "../components/loadingDiv";
import WentWrong from "../components/wentWrong";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Projects extends Component {
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
            addFeatures:"",
            addPreview:"",
            addImageOne:"",
            addImageTwo:""
        }
        this.DataDelete=this.DataDelete.bind(this);
        this.ImgCellFormatter=this.ImgCellFormatter.bind(this);

        this.AddNewModalOpen=this.AddNewModalOpen.bind(this)
        this.AddNewModalClose=this.AddNewModalClose.bind(this)

        this.onTitleChange=this.onTitleChange.bind(this)
        this.onDesChange=this.onDesChange.bind(this)
        this.onFeaturesChange=this.onFeaturesChange.bind(this)
        this.onPreviewChange=this.onPreviewChange.bind(this)
        this.onImageOneChange=this.onImageOneChange.bind(this)
        this.onImageTwoChange=this.onImageTwoChange.bind(this)
        this.addNewFormSubmit=this.addNewFormSubmit.bind(this)

    }

    AddNewModalOpen(){
        this.setState({AddNewModalOpen:true})
    }

    AddNewModalClose(){
        this.setState({AddNewModalOpen:false})
    }


    componentDidMount() {
        Axios.get('/ProjectList').then((response)=>{
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
       let confirmResult=confirm("Do You Want to Delete?");

       if(confirmResult===true){
           this.setState({deleteBtnText:"Deleting..."})

           Axios.post('/ProjectDelete',{id:this.state.rowDataId}).then((response)=>{
               if(response.status==200 && response.data==1){
                   toast.success('Data Deleted Successfully', {
                       position: "top-right",
                       autoClose: 3000,
                       hideProgressBar: false,
                       closeOnClick: true,
                       pauseOnHover: false,
                       draggable: true,
                       progress: 0,
                   });

                   this.setState({deleteBtnText:"Delete"});
                   this.componentDidMount();

               }else{
                   toast.error('Data Not Deleted!', {
                       position: "top-right",
                       autoClose: 3000,
                       hideProgressBar: false,
                       closeOnClick: true,
                       pauseOnHover: false,
                       draggable: true,
                       progress: 0,
                   });
                   this.setState({deleteBtnText:"Delete"});
               }
           }).catch((error)=>{
               toast.error('Data Not Deleted!', {
                   position: "top-right",
                   autoClose: 3000,
                   hideProgressBar: false,
                   closeOnClick: true,
                   pauseOnHover: false,
                   draggable: true,
                   progress: 0,
               });
               this.setState({deleteBtnText:"Delete"});
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

    onFeaturesChange(content, delta, source, editor){
       let htmlContent = editor.getHTML();
       this.setState({addFeatures:htmlContent})
    }

    onPreviewChange(event){
       let preview = event.target.value;
       this.setState({addPreview:preview})
    }

    onImageOneChange(event){
       let imgOne = event.target.files[0];
       this.setState({addImageOne:imgOne})
    }

    onImageTwoChange(event){
      let imgTwo = event.target.files[0];
      this.setState({addImageTwo:imgTwo})
    }

    addNewFormSubmit(event){
        event.preventDefault();
        let name = this.state.addTitle;
        let des = this.state.addDes;
        let features = this.state.addFeatures;
        let preview = this.state.addPreview;
        let imgOne = this.state.addImageOne;
        let imgTwo = this.state.addImageTwo;

        let MyFormData = new FormData();

        MyFormData.append('name',name);
        MyFormData.append('des',des);
        MyFormData.append('features',features);
        MyFormData.append('preview',preview);
        MyFormData.append('imgOne',imgOne);
        MyFormData.append('imgTwo',imgTwo);


        let url = "/AddProject";
        let config={
            headers:{'content-type':'multipart/form-data'}
        }

        Axios.post(url,MyFormData,config).then((response)=>{
            if(response.data==1){
                toast.success('Data Inserted Successfully', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: 0,
                });
                this.AddNewModalClose();
                this.componentDidMount();

            }else{
                toast.error('Data Not Inserted!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: 0,
                });
            }
        }).catch((error)=>{
            toast.error('Data Not Inserted!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: 0,
            });
        });


    }


    render() {
        if(this.state.isLoading==true){
            return(
                <Menu title="Projects">
                    <Container>
                        <LoadingDiv/>
                    </Container>
                </Menu>
            )
        }else if(this.state.isError==true){
            return(
                <Menu title="Projects">
                    <Container>
                        <WentWrong/>
                    </Container>
                </Menu>
            )
        }else{
            const data=this.state.dataList;

            const columns=[
                {dataField:'id',text:'ID'},
                {dataField:'img_one',text:'Image',formatter:this.ImgCellFormatter},
                {dataField:'project_name',text:'Project Name'},
                {dataField:'short_description',text:'Description'},
            ]

            const selectRow={
                mode:'radio',
                onSelect:(row,isSelect,rowIndex)=>{
                    this.setState({rowDataId:row['id']})
                }
            }



            return (
                <Fragment>
                    <Menu title="Projects">
                        <Container>
                            <Row>
                                <Col sm={12} md={12} lg={12}>
                                    <button onClick={this.DataDelete} className="normal-btn btn my-2">{this.state.deleteBtnText}</button>
                                    <button onClick={this.AddNewModalOpen} className="normal-btn ml-2 my-2  btn">Add New</button>
                                    <BootstrapTable keyField='id' data={ data } columns={ columns } pagination={ paginationFactory() } selectRow={selectRow}/>
                                </Col>
                            </Row>

                            <ToastContainer
                                position="top-right"
                                autoClose={3000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss={false}
                                draggable
                                pauseOnHover={false}
                            />
                        </Container>
                    </Menu>

                    {/*Add New Modal*/}

                    <Modal scrollable={true} show={this.state.AddNewModalOpen} onHide={this.AddNewModalClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add New Project</Modal.Title>

                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.addNewFormSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Project Name</Form.Label>
                                    <Form.Control onChange={this.onTitleChange}  type="text" placeholder="Project Name" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Project Description</Form.Label>
                                    <Form.Control onChange={this.onDesChange}  type="text" placeholder="Project Description" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Project Features</Form.Label>
                                    <ReactQuill onChange={this.onFeaturesChange} theme="snow" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Project Live Preview</Form.Label>
                                    <Form.Control onChange={this.onPreviewChange} type="text" placeholder="Project Live Preview" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Project Card Image</Form.Label>
                                    <Form.Control onChange={this.onImageOneChange}  type="file"/>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Project Details Image</Form.Label>
                                    <Form.Control onChange={this.onImageTwoChange}  type="file"/>
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

export default Projects;
