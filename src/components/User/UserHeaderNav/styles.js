import styled from "styled-components";

export const NavUser = styled.nav`
  &.navDesktop {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;

    a,
    button {
      background-color: #eee;
      border-radius: 0.2rem;
      height: 40px;
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid transparent;
      transition: 0.1s;
      cursor: pointer;

      &:hover {
        outline: none;
        background-color: #fff;
        box-shadow: 0 0 0 3px #eee;
        border-color: #333;
      }
    }

    .activeNavUser {
      background-color: #fff;
      box-shadow: 0 0 0 3px #fea;
      border-color: #fb1;

      svg > * {
        fill: #fb1;
      }
    }
  }

  &.navMobile {
    display: block;
    position: absolute;
    top: 70px;
    right: 0px;
    padding: 0 1rem;
    background-color: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    border-radius: 0.2rem;
    transform: translateX(-10px);
    opacity: 0;
    pointer-events: none;

    &.navMobileActive {
      pointer-events: initial;
      transition: 0.3s;
      transform: initial;
      opacity: 1;
      z-index: 100;
    }

    a,
    button {
      display: flex;
      align-items: center;
      background: none;
      width: 100%;
      border: none;
      border-bottom: 1px solid #eee;
      padding: 0.5rem 0;
      cursor: pointer;
    }

    a:hover svg > *,
    button:hover svg > * {
      fill: #fb1;
    }

    button {
      border-bottom: none;
    }

    svg {
      margin-right: 0.5rem;
    }
  }
`;

export const MobileButton = styled.button`
  background-color: #eee;
  border-radius: 0.2rem;
  height: 40px;
  width: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  transition: 0.1s;
  cursor: pointer;

  &:after {
    content: "";
    display: block;
    width: 1.2rem;
    height: 2px;
    border-radius: 2px;
    background-color: currentColor;
    box-shadow: 0 6px currentColor, 0 -6px currentColor;
    transition: 0.2s;
  }

  &:hover,
  &.mobileButtonActive {
    outline: none;
    background-color: #fff;
    box-shadow: 0 0 0 3px #fea;
    border-color: #fb1;
    color: #fb1;
  }

  &.mobileButtonActive::after {
    transform: rotate(-90deg);
    width: 4px;
    height: 4px;
    box-shadow: 0 8px currentColor, 0 -8px currentColor;
  }
`;
