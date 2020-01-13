import React, { useContext } from 'react'
import logo from 'assets/midgard-logo.svg'
import { colors } from 'colors'
import styled, { css } from 'styled-components'
import { rem } from 'polished'
import { connect } from 'react-redux'
import { AppContext } from 'midgard/context/App.context'
import { FjButton } from '@buildlyio/freyja-react'
import { logout } from 'midgard/redux/authuser/actions/authuser.actions'

const topBarHeight = rem(60);
const searchSize = rem(32);

const TopBarWrapper = styled.div`
  height: ${topBarHeight};
  max-height: ${topBarHeight};
  display: flex;
  background-color: ${colors.base};
  transition: all linear 0.3s;
  z-index: 3;

  .top-bar {
    &__main {
      display: flex;
      align-items: center;
      padding: 0 ${rem(20)};
      box-sizing: border-box;
      width: ${rem(220)};
    }

    &__menu {
      position: fixed;
      top: ${rem(12)};
      left: ${rem(20)};
      z-index: 99;
      height: ${rem(32)};
      width: ${rem(32)};
      display: flex;

      &__icon {
        position: relative;
        flex: 1;
        flex-direction: column;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: ${rem(4)};
        background-color: ${colors.white};
        box-shadow: 0 ${rem(2)} ${rem(3)} 0 ${colors.shadow};

        &:hover {
          background-color: ${colors.primaryOverlay};
        }
      }
    }
    
    &__bar {
      height: ${rem(2)};
      background-color: ${colors.primary};
      width: ${rem(16)};

      &:not(:last-of-type) {
        margin-bottom: ${rem(4)};
      }
    }

    &__menu-container {
      height: ${rem(32)};
      width: ${rem(32)};
      margin-right: ${rem(8)};
      cursor: pointer;
    }

    &__title {
      font-size: ${rem(14)};
      line-height: ${rem(18)};
      text-align: center;
    }

    &__logo {
      height: ${rem(32)};
      margin-right: ${rem(8)};
    }

    &__container {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: space-between;
      margin: ${rem(8)} ${rem(8)} ${rem(8)} 0;
    }

    &__content {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: space-between;
      padding: 0 ${rem(24)};
    }

    &__search {
      display: flex;
      padding: 0 ${rem(16)};
      &__input {
        border-radius: ${rem(4)} 0 0 ${rem(4)};
        height: ${searchSize} - ${rem(2)};
        width: ${rem(240)};
        border: ${rem(1)} solid transparent;
        padding: 0 ${rem(10)};
        font-size: ${rem(14)};
        outline: none;

        &::placeholder {
          color: ${colors.gray};
        }

        &:focus {
          border-color: ${colors.primary};
        }
      }

      &__submit {
        height: ${searchSize};
        width: ${searchSize};
        background-color: ${colors.primary};
        border: ${rem(1)} solid transparent;
        color: ${colors.white};
        font-weight: bold;
        border-radius: 0 ${rem(4)} ${rem(4)} 0;
        cursor: pointer;
        outline: none;
        transition: all 0.2s linear;
        padding: 0;

        img {
          height: ${rem(18)};
          width: ${rem(18)};
        }

        &:hover {
          background-color: ${colors.primaryDarker};
        }
      }
    }
  }

  ${props => props.hidden && css`
    max-height: 0;
    overflow: hidden;

    .top-bar {
      &__menu {
        &__icon {
          background-color: ${colors.primary};

          &:hover {
            background-color: ${colors.primaryDarker};
          }
        }
      }
      &__bar {
        background-color: ${colors.white};
      }
    }
  `}
`

/**
 * Component for the top bar header.
 */
function NavBarAdmin({ navHiddenState, history, location, dispatch }) {
  const app = useContext(AppContext);
  const [navHidden, setNavHidden] = navHiddenState;

  /**
   * Clears authentication and redirects to the login screen.
   */
  const userLogout = () => {
    dispatch(logout());
    const { from } = location.state || { from: { pathname: "/admin-login" } };
    history.push(from);
  }

  return (
    <TopBarWrapper className="top-bar" hidden={navHidden}>
      <div className="top-bar__container">
        <div className="top-bar__main">
          <div className="top-bar__menu-container">
            <div className="top-bar__menu" onClick={() => setNavHidden(!navHidden)}>
              <div className="top-bar__menu__icon">
                <div className="top-bar__bar"></div>
                <div className="top-bar__bar"></div>
                <div className="top-bar__bar"></div>
              </div>
            </div>
          </div>
          <img className="top-bar__logo" src={logo} />
          <h1 className="top-bar__title">{app.appTitle} Admin</h1>
        </div>
        <FjButton size="micro" onClick={userLogout}>Logout</FjButton>
      </div>
    </TopBarWrapper>
  )
}

export default connect()(NavBarAdmin);
