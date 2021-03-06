import React, {useEffect, Fragment} from 'react'
import Spinner from "../layouts/Spinner";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom'
import Repos from '../repos/Repos'

const User = ({user, getUserRepos, getUser, repos, loading, match}) => {

    useEffect(() => {
        getUser(match.params.login)
        getUserRepos(match.params.login)
        //eslint-disable-next-line
    }, [])




        const {
            name,
            avatar_url,
            location,
            bio,
            blog,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable,
            company
        } = user

    //this if stat is not working
        if(loading) return <Spinner />

        return(
            <>
            < Link to='/' className="btn btn-light">
                Back to Search
            </Link>
            Available:{hireable ? 'true' : 'false'
                }
                <div className="card grid-2">
                    <div className="all-center">
                        <img src={avatar_url} alt="" className="round-img" style={{width: '150px'}}/>
                        <h1> {name}</h1>
                        <p>Location: {location}</p>
                    </div>
                    <div >{bio && <>
                    <h3>Bio</h3>
                        <p>{bio}</p>
                    </>}
                    <a href={html_url} className="btn btn-dark my-1">Visit github profile</a>
                        <ul>
                            <li>
                                {login && <Fragment>
                                <strong>Username: </strong>{login}
                                </Fragment>}
                            </li>
                            <li>
                                {company && <Fragment>
                                    <strong>Company: </strong>{company}
                                </Fragment>}
                            </li>
                            <li>
                                {blog && <Fragment>
                                    <strong>Website: </strong>{blog}
                                </Fragment>}
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="card text-center">
                    <div className="badge badge-primary">
                        Followers: {followers}
                    </div>
                    <div className="badge badge-success">
                        Following: {following}
                    </div>
                    <div className="badge badge-light">
                        Public repos: {public_repos}
                    </div>
                    <div className="badge badge-dark">
                        Public Gists: {public_gists}
                    </div>


                </div>
                <Repos repos={repos} />

                </>

        )




}

User.propTypes ={
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired
}

export default User

