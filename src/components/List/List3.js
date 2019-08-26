import React, {Component} from 'react';
import {Grid} from '@material-ui/core';
import '../../App.css';
import CardGrid from "./CardGrid";
import logo from '../../images/logo.png';
import leftArrow from '../../images/leftArrow.png';
import plusTab from '../../images/plusTab.png';
import _ from "lodash";
import Tabs from '../Tabs/Tabs';
const delay = 350;

class List extends Component {
  state = {
    topbarVisible: true,
    sidebarVisible: true,
    isMouseInTop: false,
    items: [
      // {id: 'Component1', type: 'component', value: 'Component1', x: 0, y: Infinity, w: 1, h: 2, add: false},
      // {id: 'Component2', type: 'component', value: 'Component2', x: 1, y: Infinity, w: 1, h: 2, add: false},
      // {id: 'Component3', type: 'component', value: 'Component3', x: 2, y: Infinity, w: 1, h: 2, add: false},
      {id: Math.random(), type: 'component', value: 'Component1', x: 0, y: Infinity, w: 1, h: 2, add: false},
      {id: Math.random(), type: 'component', value: 'Component2', x: 1, y: Infinity, w: 1, h: 2, add: false},
      {id: Math.random(), type: 'component', value: 'Component3', x: 2, y: Infinity, w: 1, h: 2, add: false},
    ],
    newCounter: 0,
    isEditingCard: false,
  };

  sideLinks = [
    {name: 'Info', type: 'component', value: 'Component1'},
    {name: 'Time', type: 'component', value: 'Component2'},
    {name: 'Post', type: 'component', value: 'Component3'},
    {name: 'Form', type: 'component', value: 'Component4'},
    {name: 'Personal', type: 'component', value: 'Component5'},
    {name: 'Historik', type: 'component', value: 'Component6'},
    {name: 'Trains', type: 'component', value: 'Component7'},
    {name: 'Cities', type: 'component', value: 'Component8'},
    {name: 'Notice', type: 'component', value: 'Component9'},
  ];


  toggleTopbar = () => {
    this.setState({
      topbarVisible: !this.state.topbarVisible,
    });
    setTimeout(window.dispatchEvent, delay, new Event('resize'));
  };

  toggleSidebar = () => {
    this.setState({
      sidebarVisible: !this.state.sidebarVisible,
    });
    setTimeout(window.dispatchEvent, delay, new Event('resize'));
  };

  toggleAll = () => {
    this.setState({
      topbarVisible: !this.state.topbarVisible,
      sidebarVisible: !this.state.sidebarVisible,
    });
    setTimeout(window.dispatchEvent, delay, new Event('resize'));
  };

  onMouseMove = (e) => {
    if (e.clientY < 20) {
      this.setState({
        isMouseInTop: true,
      });
    } else if (e.clientY > 100) {
      this.setState({
        isMouseInTop: false,
      });
    }
  };

  onMouseLeave = (e) => {
    console.log('Mouse Leaving');
    this.setState({
      isMouseInTop: false,
    });
  };


  onAddItem = (type, value) => {
    const {items} = this.state;
    for (let item of items) {
      console.log(value, item);
      if (type === 'component' && item.id == value)
        return;
    }
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        // id: value,
        id: Math.random(),
        type: type,
        value: value,
        x: (this.state.items.length) % 3,
        y: Infinity, // puts it at the bottom
        w: 1,
        h: 2,
      }),
    });
  };

  onRemoveItem = (id) => {
    console.log("removing", id);
    this.setState({items: _.reject(this.state.items, {id: id})});
  };

  onEditClicked = () => {
    this.setState({
      isEditingCard: !this.state.isEditingCard,
    });
  };

  render() {
    const {sideLinks} = this;
    const {topbarVisible, sidebarVisible, isMouseInTop, items, isEditingCard} = this.state;
    return (
      <Grid container onMouseMove={this.onMouseMove} onMouseLeave={this.onMouseLeave}>
        <Grid item lg={12} id={"toggle"} className={topbarVisible ? '' : (isMouseInTop ? '' : 'toggle-full-mode')}
              onClick={this.toggleAll}></Grid>
        <Grid container id={"topBar"} className={topbarVisible ? "" : "topBar-hide"}>
        <Grid item lg={1} md={1} className={"logo-main"}>
            <a href="#"><img src={logo} className="App-logo" alt="logo" /></a>
          </Grid>
          <Grid item lg={11} md={11} className={"nav-bar"}>
            <select className="role">
                <option>Admin</option>
                <option>User 1</option>
                <option>User 2</option>
                <option>User 3</option>
                <option>Default User</option>
            </select>
            <ul className="nav-bar">
                  <li><a href="#">Välj Tåg</a></li>
                  <li><a href="#">Sök Tåg</a></li>
                  <li><a href="#">Plats och Tid</a></li>
                  <li><a href="#">Händelselista</a></li>
                  <li><a href="#">Varningar</a></li>
                  <li key={'edit'} className="edit"><a onClick={this.onEditClicked}>{isEditingCard ? 'End Edit' : 'Start Edit'}</a></li>
                  <li key={'edit'} className="edit"><a href="#">Save</a></li>
              </ul>
          </Grid>
        </Grid>
        {/*<div >*/}
        {/*  */}
        {/*</div>*/}
        <div id={"sideBar"} className={sidebarVisible ? '' : 'sideBar-hide'}>
          <a href="#" class="leftArrow"><img src={leftArrow} alt=""/></a>
          <ul>
            {_.map(sideLinks, (ln, index) => {
              return (
                <li key={index}><a onClick={() => this.onAddItem(ln.type, ln.value)}>{ln.name}</a></li>
              );
            })}
          </ul>
        </div>
        <div id={"mainContent"} className={topbarVisible ? "main-content-normal" : "main-content-full"}>
          {/*<List isFull={!topbarVisible}/>*/}
          <ul class="tab">
            <li className="current">Tab 1: First Tab</li>
            <li>Tab 2:</li>
            <li>Tab 3:</li>
            <li className="plus"><a href="#"><img src={plusTab} alt=""/></a></li>
          </ul>
          <CardGrid items={items} isEditingCard={isEditingCard} onRemoveItem={this.onRemoveItem}/>
        </div>
      </Grid>
    );
  }

}

export default List;
