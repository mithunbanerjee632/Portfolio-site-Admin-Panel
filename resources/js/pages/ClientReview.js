import React, {Component, Fragment} from 'react';
import Menu from "../components/Menu";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import LoadingDiv from "../components/loadingDiv";
import WentWrong from "../components/wentWrong";
import Axios from "axios";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";

class ClientReview extends Component {
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
            addPhoto:"",
            addBtnText:"Submit"
        }
        this.DataDelete=this.DataDelete.bind(this)

        this.AddNewModalOpen=this.AddNewModalOpen.bind(this)
        this.AddNewModalClose=this.AddNewModalClose.bind(this)

        this.TitleOnChange=this.TitleOnChange.bind(this)
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

    TitleOnChange(event){
        let title = event.target.value;
        this.setState({addTitle:title})
    }

    DesOnChange(event){
       let des = event.target.value;
        this.setState({addDes:des})
    }

    FileOnChange(event){
      let photo = event.target.files[0];
      this.setState({addPhoto:photo})
    }

    addNeFormSubmit(event){
        event.preventDefault();
        let title = this.state.addTitle;
        let des   = this.state.addDes;
        let photo = this.state.addPhoto;
        // let photoSize = photo.size;
        // let photoName = photo.name;

        let url = "/AddReview";

        let MyFormData = new FormData();
        MyFormData.append('title',title);
        MyFormData.append('des',des);
        MyFormData.append('photo',photo);

        let config = {
            headers:{'content-type':'multipart/form-data'}
        }


       this.setState({addBtnText:"Submitting..."})
        Axios.post(url,MyFormData,config).then((response)=>{
             if(response.data==1){

                 this.componentDidMount();

                 setTimeout(function(){
                     this.setState({addBtnText:"Submit"})
                 }.bind(this),2000);
             }
        }).catch((error)=>{
            alert(error);
            setTimeout(function(){
                this.setState({addBtnText:"Submit"})
            }.bind(this),2000);
        });
    }

componentDidMount() {
        Axios.get('/ClientReviewList').then((response)=>{
           if(response.status==200){
               this.setState({dataList:response.data,isLoading:false,isError:false})
           }else{
               this.setState({isLoading:false,isError:true})
           }
        }).catch((error)=>{
            this.setState({isLoading:false,isError:true})
        })

}

DataDelete(){
    let confirmResult= confirm("Do You Want to Delete?");
    if(confirmResult==true){
        this.setState({deleteBtnText:"Deleting..."})

        Axios.post('/ClientReviewDelete',{id:this.state.rowDataId}).then((response)=>{
            if(response.status==200 && response.data==1){
                this.setState({deleteBtnText:"Data Deleted Successfully!"})
                this.componentDidMount();
                setTimeout(function(){
                    this.setState({deleteBtnText:"Delete"})
                }.bind(this),2000);
            }else{
                this.setState({deleteBtnText:"Data Not Deleted !"})
                setTimeout(function(){
                    this.setState({deleteBtnText:"Delete"})
                }.bind(this),2000);
            }
        }).catch((error)=>{
            this.setState({deleteBtnText:"Data Not Deleted !"})
            setTimeout(function(){
                this.setState({deleteBtnText:"Delete"})
            }.bind(this),2000);
        })
    }
}



    render() {
        if(this.state.isLoading==true){
            return(
                <Menu title="Client Review">
                    <Container>
                        <LoadingDiv/>
                    </Container>
                </Menu>
            )
        }else if(this.state.isError==true){
          return(
              <Menu title="Client Review">
                  <Container>
                      <WentWrong/>
                  </Container>
              </Menu>
          )
        }else{
            const data=this.state.dataList;

            const columns=[
                {dataField: 'id', text: 'ID'},
                {dataField: 'client_title', text: 'Client Name'},
                {dataField: 'client_description', text: 'Description'},

            ]

            const selectRow={
                mode:'radio',
                onSelect:(row,isSelect,rowIndex)=>{
                    this.setState({rowDataId:row['id']});
                }
            }
            return (
                <Fragment>

                    <Menu title="Client Review">
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
                            <Modal.Title>Add New Review</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.addNeFormSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Review Title</Form.Label>
                                    <Form.Control onChange={this.TitleOnChange} type="text" placeholder="Review" />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Review Description</Form.Label>
                                    <Form.Control onChange={this.DesOnChange} type="text" placeholder="Review Description" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Client Image</Form.Label>
                                    <Form.Control onChange={this.FileOnChange} type="file" placeholder="Client Image" />
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

export default ClientReview;
