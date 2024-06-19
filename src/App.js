import './App.css'

import {Component} from 'react'

import {v4} from 'uuid'

const colorList = ['orange', 'green', 'brown', 'blue', 'yellow']

class App extends Component {
  state = {
    isTrue: false,
    commentList: [],
    website: '',
    username: '',
    password: '',
    isShow: false,
  }

  showPassword = e => {
    if (e.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  onAddComment = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const colorValue = colorList[Math.floor(Math.random() * 5)]

    const newComment = {
      id: v4(),
      websiteValue: website,
      userName: username,
      Password: password,
      addValue: colorValue,
      initialValue: initial,
    }
    this.setState(prevState => ({
      commentList: [...prevState.commentList, newComment],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  websiteInput = event => {
    this.setState({website: event.target.value})
  }

  userNameInput = event => {
    this.setState({username: event.target.value})
  }

  passwordInput = event => {
    this.setState({password: event.target.value})
  }

  searchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  clickToDelete = id => {
    const {commentList} = this.state

    const newList = commentList.filter(each => each.id !== id)
    const caseOf = newList.length !== 0
    this.setState({commentList: newList, isTrue: caseOf})
  }

  render() {
    const {
      website,
      username,
      password,
      searchInput,
      commentList,
      isShow,
    } = this.state

    let {isTrue} = this.state

    const newList = commentList.filter(eachValue =>
      eachValue.websiteValue.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="password-bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="password-logo"
        />
        <div className="container">
          <div className="password-manager-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-manager-img"
            />
            <form onSubmit={this.onAddComment} className="password-con-card">
              <h1 className="add-password-heading">Add new password</h1>
              <div className="website-input-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                  alt="website"
                  className="website-image"
                />
                <hr className="horizontal-line" />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="website-input"
                  onChange={this.websiteInput}
                  value={website}
                />
              </div>
              <div className="website-input-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                  alt="username"
                  className="website-image"
                />
                <hr className="horizontal-line" />
                <input
                  type="text"
                  placeholder="Enter username"
                  className="website-input"
                  onChange={this.userNameInput}
                  value={username}
                />
              </div>
              <div className="website-input-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                  alt="password"
                  className="website-image"
                />
                <hr className="horizontal-line" />
                <input
                  type="password"
                  placeholder="Enter password"
                  className="website-input"
                  onChange={this.passwordInput}
                  value={password}
                />
              </div>
              <div className="button-card">
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>
            <div className="password-view-large">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="large-img"
              />
            </div>
          </div>
        </div>
        <div className="your-bg-con">
          <div className="your-password-card">
            <div className="your-passwords-heading-card">
              <div className="your-password-heading-count">
                <h1 className="password-heading">Your passwords</h1>
                <p className="password-count">{newList.length}</p>
              </div>
              <div className="your-password-search">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
                  alt="search"
                  className="search-img"
                />
                <hr className="horizontal" />
                <input
                  type="search"
                  className="input-search"
                  placeholder="search"
                  onChange={this.searchInput}
                />
              </div>
            </div>
            <hr className="bottom-horizontal" />
            <div className="show-password-con">
              <input
                type="checkbox"
                id="checkbox"
                className="input-checkbox"
                onChange={this.showPassword}
              />
              <label className="show-password-para" htmlFor="checkbox">
                Show passwords
              </label>
            </div>
            {!isTrue && (
              <div className="bottom-show-password">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-password-img"
                />
                <p className="bottom-no-password">No passwords</p>
              </div>
            )}
            {isTrue && (
              <ul className="list-container">
                {newList.map(eachCom => (
                  <li
                    className="initial-background"
                    key={eachCom.id}
                    id={eachCom.id}
                  >
                    <p className={`initial ${eachCom.addValue}`}>
                      {eachCom.initialValue}
                    </p>
                    <div className="website-details">
                      <p className="website-name">{eachCom.websiteValue}</p>
                      <p>{eachCom.userName}</p>
                      {!isShow && (
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                          alt="stars"
                          className="stars-img"
                        />
                      )}
                      {isShow && <p>{eachCom.Password}</p>}
                    </div>
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => this.clickToDelete(eachCom.id)}
                      data-testid="delete"
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png "
                        alt="delete"
                        className="delete-img"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
