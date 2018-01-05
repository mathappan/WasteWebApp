import React from 'react';
import  ReactDOM  from 'react-dom';
import { Button, Dropdown } from 'semantic-ui-react';

export class ButtonExampleIcon extends React.Component { 
    
     constructor(props) {
                super(props);
                this.handleChange = this.handleChange.bind(this);
        }

    handleChange(){
            this.props.store.dispatch({ type: 'preferencesButtonClicked' });
        }
        render () {
                const props = this.props;
                  const {store} = props;
                  let state = store.getState();
                return (
                      <Button onClick={this.handleChange} disabled={state.wasteInformationOptions.buttonDisabled} primary icon='setting' circular size="large"  />
                )
        }
}
    