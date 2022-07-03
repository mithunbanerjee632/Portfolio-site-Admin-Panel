import React, {Component, Fragment} from 'react';
import Menu from "../components/Menu";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import LoadingDiv from "../components/loadingDiv";
import WentWrong from "../components/wentWrong";
import Axios from "axios";
import {Col, Container, Row} from "react-bootstrap";

class ClientReview extends Component {
    constructor() {
        super();
        this.state={
            dataList:[],
            isLoading:true,
            isError:false,
            rowDataId:"",
            deleteBtnText:"Delete"
        }
        this.DataDelete=this.DataDelete.bind(this)
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
                <Menu>
                    <Container>
                        <LoadingDiv/>
                    </Container>
                </Menu>
            )
        }else if(this.state.isError==true){
          return(
              <Menu>
                  <Container>
                      <WentWrong/>
                  </Container>
              </Menu>
          )
        }else{
            const data=this.state.dataList;

            const columns=[
                {dataField: 'id', text: 'ID'},
                {dataField: 'client_title', text: 'Client Title'},
                {dataField: 'client_description', text: 'Client Description'},
                {dataField: 'client_img', text: 'Client Image'},
            ]

            const selectRow={
                mode:'radio',
                onSelect:(row,isSelect,rowIndex)=>{
                    this.setState({rowDataId:row['id']});
                }
            }
            return (
                <Fragment>

                    <Menu>
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

export default ClientReview;
