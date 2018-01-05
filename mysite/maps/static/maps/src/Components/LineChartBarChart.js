import React from 'react';
import  ReactDOM  from 'react-dom';
import { Segment } from 'semantic-ui-react';

export class SegmentBarchartContainer extends React.Component {
    render () {
        return (
            <Segment.Group horizontal compact>
    
    <Segment>
            <svg className="linechart"></svg>
              
    </Segment>

    <Segment>
            <svg className="chart3"></svg>
             
    </Segment>
  </Segment.Group>
        )
    }
}


 