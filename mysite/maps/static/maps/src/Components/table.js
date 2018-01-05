import React from 'react';
import  ReactDOM  from 'react-dom';
import ReactTable from 'react-table';
 

export class Table extends React.Component {
constructor(props) {
                super(props);
          
        }
   
render() {


     let columns = [
        {Header: "Facility Name",
         accessor: "Facility Name",
        minWidth: 200},
         { Header: "Waste Stream Type",
            accessor: "Waste Stream Type",
            minWidth: 200},
            {Header : "Facility Type",
            accessor: "Facility Type",
            minWidth: 200}

    ]
    const props = this.props;
    const {store} = props;
    let state = store.getState();
    let data = state.tableState.data;
    console.log(data);
    return <ReactTable data={data} columns={columns} />
    
    }
}