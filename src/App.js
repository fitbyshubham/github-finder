import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import './App.css'
import Users from "./components/users/Users";
import User from "./components/users/User";


import axios from "axios";
import Search from "./components/users/Search";
import Alert from "./components/layouts/Alert";
import About from "./components/pages/About";


class App extends Component{
    state = {
        users: [],
        user: {},
        repos: [],
        loading: false,
        alert: null
}


//Search Github Users

    searchUsers = async text => {
        this.setState({loading: true})
        const res= await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${
            process.env.REACT_APP_CLIENT_ID
        }&client_secret=${process.env.REACT_APP_CLIENT_SECRET_ID}`)
        this.setState({users: res.data.items, loading: false})

    }

    //Get Users Repos
    getUserRepos = async (username) => {
        this.setState({loading: true})
        const res= await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
            process.env.REACT_APP_CLIENT_ID
        }&client_secret=${process.env.REACT_APP_CLIENT_SECRET_ID}`)
        this.setState({repos: res.data, loading: false})
    }

    //Get Single Github User

    getUser = async (username) => {
        this.setState({loading: true})
        const res= await axios.get(`https://api.github.com/users/${username}?client_id=${
            process.env.REACT_APP_CLIENT_ID
        }&client_secret=${process.env.REACT_APP_CLIENT_SECRET_ID}`)
        this.setState({user: res.data, loading: false})
    }



    //clear search dialog

    clearUsers = () => {
        this.setState({users: [], loading: false})
    }

    // Set Alert
    setAlert = (msg, type) => {
        this.setState({alert: {msg, type}})

        setTimeout(() => {this.setState({alert: null})}, 5000)

    }
    cancelButton = () =>{
        this.setState({alert: null})
    }


    render(){
        return(
            <Router>
                <Navbar/>

                <div className='container'>
                    <Alert alert={this.state.alert} />
                    <Switch>
                        <Route exact path="/" render={props => (
                            <>
                                <Search searchUsers={this.searchUsers}
                                        clearUsers={this.clearUsers}
                                        showClear={this.state.users.length > 0 ? true: false}
                                        setAlert={this.setAlert}
                                />

                                <Users loading={this.state.loading} users={this.state.users}/>
                            </>
                        )}/>
                        <Route exact path ="/about" component={About}/>
                        <Route exact path="/user/:login" render={ props => (
                            <User {...props}
                                  getUser={this.getUser}
                                  user={this.state.user}
                                  loading={this.state.loading}
                                  getUserRepos={this.getUserRepos}
                                  repos={this.state.repos}
                            />

                        )

                        }/>
                    </Switch>


                </div>


            </Router>


        )
    }
}



export default App