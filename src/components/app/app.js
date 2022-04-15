import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

export default class App extends Component {

   constructor(props) {
      super(props);
      this.maxId = 1;
      this.state = {
         data: [
            this.createItem('Taras Shevhcenko', 800),
            this.createItem('Alex Shepard', 1200),
            this.createItem('Jenya Korolenko', 3000),
         ],
         term: '',
         filter: 'all'
      }
   }

   createItem = (name, salary) => {
      return {
         name: name,
         salary: salary,
         increase: false,
         rise: false,
         id: this.maxId++,
      }
   }

   onDelete = (id) => {
      this.setState(({ data }) => {
         return {
            data: data.filter(el => el.id !== id)
         };
      });
   }

   onAdd = (text, salary) => {
      this.setState(({data}) => {
         const newEl = this.createItem(text, salary);
         return {
            data: [...data, newEl]
         };
      })
   }

   onToggleProp = (id, prop) => {
      this.setState(({data}) => ({
         data: data.map(item => {
            if ( item.id === id ) {
               return {...item, [prop]: !item[prop]}
            }
            return item;
         })
      }));
   }

   onInputChange = (term) => {
      this.setState({ term })
   }

   searchEmp = (items, term) => {
      if (items.length === 0) return items;

      return items.filter(item => {
         return item.name
         .toLowerCase()
         .indexOf(term.toLowerCase()) > -1;
      });
   }

   onFilter = (filter) => {
      this.setState({filter});
   }

   filter = (items, filter) => {
      switch (filter) {
         case 'all':
            return items;
         case 'rise':
            return items.filter(el => el.rise);
         case 'rich':
            return items.filter(el => el.salary > 1000);
      }
   }

   render() {
      const {data, term, filter} = this.state;

      const employees = data.length;
      const increased = data.filter(el => el.increase).length;
      const visibleData = this.filter(this.searchEmp(data, term), filter);

      return (
         <div className="app">
            <AppInfo toIncrease={increased} personCount={employees}/>
   
            <div className="search-panel">
               <SearchPanel onInputChange={ this.onInputChange }/>
               <AppFilter onFilter={ this.onFilter }/>
            </div>
   
            <EmployeesList onToggleProp={ this.onToggleProp }
                           onDelete={ this.onDelete } 
                           data={visibleData}/>
            <EmployeesAddForm onItemAdd={ this.onAdd }/>
         </div>
      );
   }
}