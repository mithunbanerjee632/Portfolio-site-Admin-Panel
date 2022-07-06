import React, {Component, Fragment} from 'react';
import Menu from "../components/Menu";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import Axios from "axios";
import paginationFactory from "react-bootstrap-table2-paginator";
import LoadingDiv from "../components/loadingDiv";
import WentWrong from "../components/wentWrong";

class Services extends Component {
    constructor() {
        super();
        this.state={
            dataList:[],
            isLoading:true,
            isError:false,
            rowDataId:"",
            deleteBtnText:"Delete",
            AddNewModalOpen:false,
            addName:"",
            addDes:"",
            addLogo:""


        }

        this.DataDelete=this.DataDelete.bind(this);

        this.AddNewModalOpen=this.AddNewModalOpen.bind(this)
        this.AddNewModalClose=this.AddNewModalClose.bind(this)

        this.NameOnChange=this.NameOnChange.bind(this)
        this.DesOnChange=this.DesOnChange.bind(this)
        this.FileOnChange=this.FileOnChange.bind(this)
        this.addNeFormSubmit=this.addNeFormSubmit.bind(this)
    }

    AddNewModalOpen(){
        this.setState({AddNewModalOpen:true})
    }

    AddNewModalClose(){
        this.setState({AddNewModalOpen:false})
    }

    //Form Data Pull
    NameOnChange(event){
        let name = event.target.value;
        this.setState({addName:name})

    }

    DesOnChange(event){
        let des = event.target.value;
        this.setState({addDes:des})
    }

    FileOnChange(event){
        let logo = event.target.files[0];
        this.setState({addLogo:logo})
    }

    addNeFormSubmit(event){
        event.preventDefault();

        let name = this.state.addName;
        let des = this.state.addDes;
        let logo = this.state.addLogo;

        let MyFormData = new FormData();

        MyFormData.append('name',name);
        MyFormData.append('des',des);
        MyFormData.append('logo',logo);

        let url = "AddService";

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




    componentDidMount() {
        Axios.get('/ServiceList').then((response)=>{
            if(response.status==200){
                this.setState({dataList:response.data,isLoading:false,isError:false})
            }else{
                this.setState({isLoading:false,isError:true});
            }
        }).catch((error)=>{
            this.setState({isLoading:false,isError:true});
        });
    }

     DataDelete(){
        let confirmResult = confirm("Do You Want to Delete?")
         if(confirmResult===true){
             this.setState({deleteBtnText:"Deleting..."})

             Axios.post('/ServiceDelete',{id:this.state.rowDataId}).then((response)=>{
                 if(response.status==200 && response.data==1){
                     this.setState({deleteBtnText:"Data Deleted Successfully!"})
                     this.componentDidMount()
                     setTimeout(function(){
                         this.setState({deleteBtnText:"Delete"})
                     }.bind(this),2000);
                 }else{
                     this.setState({deleteBtnText:"Data is Not Deleted !"})
                     setTimeout(function(){
                         this.setState({deleteBtnText:"Delete"})
                     }.bind(this),2000);
                 }
             }).catch((error)=>{
                 this.setState({deleteBtnText:"Data is Not Deleted !"})
                 setTimeout(function(){
                     this.setState({deleteBtnText:"Delete"})
                 }.bind(this),2000);
             })
         }

    }


    render() {


            if(this.state.isLoading==true){
               return(
                   <Menu title="Services">
                       <Container>
                           <LoadingDiv/>
                       </Container>
                   </Menu>
               )
            }else if(this.state.isError==true){
              return(
                  <Menu title="Services">
                      <Container>
                          <WentWrong/>
                      </Container>
                  </Menu>
              )
            }else{
                const data=this.state.dataList;
                const columns=[
                    {dataField:'id',text:'ID'},
                    {dataField:'service_name',text:'Services'},
                    {dataField:'service_description',text:'Service Description'},
                ]

                const selectRow={
                    mode:'radio',
                    onSelect: (row, isSelect, rowIndex) => {
                        this.setState({rowDataId:row['id']})
                    }
                }

                return (

                    <Fragment>
                        <Menu title="Services">
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
                                <Modal.Title>Add New Services</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={this.addNeFormSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Service Name</Form.Label>
                                        <Form.Control onChange={this.NameOnChange} type="text" placeholder="Service Name" />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Service Description</Form.Label>
                                        <Form.Control onChange={this.DesOnChange} type="text" placeholder="Service Description" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Service Logo</Form.Label>
                                        <Form.Control onChange={this.FileOnChange} type="file" placeholder="Service Logo" />
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
                                <Button variant="primary">
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>

                    </Fragment>
                );
            }


    }
}

export default Services;
