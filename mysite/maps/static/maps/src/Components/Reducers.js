var optionsforMap1 = ['Total Local Authority Collected Waste', 'Household – Total Waste', 'Household - Waste not Sent for Recycling',
'Non-household – Total Waste', 'Non-household – Waste not Sent for Recycling', 'Local Authority Collected Waste - Not Sent for Recycling'];
var optionsforMap2 = ['Hazardous landfill', 'Non-hazardous landfill', 'Inert landfill', 'Incineration with energy recovery', 'Incineration without energy recovery'];


// for toggling display the filter button
export const preferences = (state = {display: 'none', position: 'absolute', width: '100%', zIndex: 999}, action) => {
        switch (action.type) {
                case 'preferencesButtonClicked':
                     
                        return {display: 'block', position: 'absolute', width: '100%', zIndex: 999}
                case 'doneButtonClicked':
                        return {display: 'none', position: 'absolute', width: '100%', zIndex: 999}
                default:
                      
                        return state
        }
}

//for displaying filters 
export const wasteInformationOptions = (
        state = {
        'Total Local Authority Collected Waste': { display: 'none', width: '100%'},
        'Household – Total Waste': { display: 'none', width: '100%'},
        'Household - Waste not Sent for Recycling': { display: 'none', width: '100%'},
        'Non-household – Total Waste': { display: 'none', width: '100%'},
        'Non-household – Waste not Sent for Recycling': { display: 'none', width: '100%'},
        'Local Authority Collected Waste - Not Sent for Recycling': { display: 'none', width: '100%'},
        'Hazardous landfill': {display: 'none', width: '100%'},
        'Non-hazardous landfill': {display: 'none', width: '100%'},
        'Inert landfill': {display: 'none', width: '100%'},
        'Incineration with energy recovery': {display: 'none', width: '100%'},
        'Incineration without energy recovery': {display: 'none', width: '100%'},
        donebutton: {display: 'none'},
        selectedOption: 'None Selected',
        buttonDisabled: true,
        }, action) => {
        // to reset the display of all filters, a has been defined
        let a = {

        'Total Local Authority Collected Waste': { display: 'none', width: '100%'},
        'Household – Total Waste': { display: 'none', width: '100%'},
        'Household - Waste not Sent for Recycling': { display: 'none', width: '100%'},
        'Non-household – Total Waste': { display: 'none', width: '100%'},
        'Non-household – Waste not Sent for Recycling': { display: 'none', width: '100%'},
        'Local Authority Collected Waste - Not Sent for Recycling': { display: 'none', width: '100%'},
        'Hazardous landfill': {display: 'none', width: '100%'},
        'Non-hazardous landfill': {display: 'none', width: '100%'},
        'Inert landfill': {display: 'none', width: '100%'},
        'Incineration with energy recovery': {display: 'none', width: '100%'},
        'Incineration without energy recovery': {display: 'none', width: '100%'},
        donebutton: {display: 'none'},
        selectedOption: 'None Selected',
        current_layer: '',
        buttonDisabled: true,
        };

        switch (action.type) {
                case 'changeInOptions':

                        a[action.selectedOption] = {display: 'block', width: '90%', marginTop: '20px'};    
                        a.selectedOption = action.selectedOption;
                        a.donebutton = {display: 'block'};
                        a.buttonDisabled = false;
                        if (optionsforMap1.includes(action.selectedOption))// changing map depending on option selected
                        {
                                a.current_layer = geojsonlayer1;
                        }
                        else 
                        {       
             //                   console.log(geojsonlayer2);
                                a.current_layer = geojsonlayer2;
                        }

                        return a;
                default:
                        return state
        }
}



export const filterValues = (
        state = {
                'Total Local Authority Collected Waste': 0,
                'Household – Total Waste': 0,
                'Household - Waste not Sent for Recycling': 0,
                'Non-household – Total Waste': 0,
                'Non-household – Waste not Sent for Recycling': 0,
                'Local Authority Collected Waste - Not Sent for Recycling': 0,
                'Hazardous landfill': 0,
                'Non-hazardous landfill': 0,
                'Inert landfill': 0,
                'Incineration with energy recovery': 0,
                'Incineration without energy recovery': 0
}, action) => {
      
        let a = state;
        switch (action.type) {
                case 'Total Local Authority Collected WasteMinimumValueChanged':
                        a['Total Local Authority Collected Waste'] = action.value;
                        return a;

                case 'Local Authority Collected Waste - Not Sent for RecyclingMinimumValueChanged':
                        a['Local Authority Collected Waste - Not Sent for Recycling'] = action.value;
                        return a;

                case 'Household – Total WasteMinimumValueChanged':
                        a['Household – Total Waste'] = action.value;
                        return a;

                case 'Household - Waste not Sent for RecyclingMinimumValueChanged':
                        a['Household - Waste not Sent for Recycling'] = action.value;
                        return a;
                case 'Non-household – Waste not Sent for RecyclingMinimumValueChanged':
                        a['Non-household – Waste not Sent for Recycling'] = action.value;
                        return a;
                case 'Hazardous landfill':
                        a['Hazardous landfill'] = action.value;
                        return a;
                case 'Non-hazardous landfill':
                        a['Non-hazardous landfill'] = action.value;
                case 'Inert landfill':
                        a['Inert landill'] = action.value;
                case 'Incineration with energy recovery':
                        a['Incineration with energy recovery'] = action.value;
                case 'Incineration without energy recovery':
                        a['Incineration without energy recovery'] = action.value;
              
                default:
                        return a;
        }


}

