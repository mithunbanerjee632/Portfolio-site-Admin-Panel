import React, {Component, Fragment} from 'react';
import Menu from "../components/Menu";
import {Col, Container, Row} from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import Axios from "axios";
import paginationFactory from "react-bootstrap-table2-paginator";
import LoadingDiv from "../components/loadingDiv";
import WentWrong from "../components/wentWrong";

class Projects extends Component {
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
                   this.setState({deleteBtnText:"Data Deleted Successfully!"})
                   this.componentDidMount();
                   setTimeout(function(){
                       this.setState({deleteBtnText:"Delete"});
                   }.bind(this),2000)
               }else{
                   this.setState({deleteBtnText:"Data Not Deleted!"})

                   setTimeout(function(){
                       this.setState({deleteBtnText:"Delete"});
                   }.bind(this),2000);
               }
           }).catch((error)=>{
               this.setState({deleteBtnText:"Data Not Deleted!"})

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

export default Projects;
