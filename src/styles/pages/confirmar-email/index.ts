import Link from 'next/link'
import styled from 'styled-components'


export const Container = styled.div`
  max-width: 600px;
  width: calc(100% - 1.5rem);
  max-height: calc(100% - 1.5rem);
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  overflow-y: auto;
`

export const Header = styled.div`
  background-color: #ff6d3c;
  padding: 20px;
  text-align: center;
`

export const Logo = styled.img`
  max-width: 180px;
`

export const Content = styled.div`
  padding: 30px;
  text-align: center;
`

export const Title = styled.h1`
  color: #ff6d3c;
`

export const Text = styled.p`
  font-size: 16px;
  color: #555;
`

export const Button = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  background-color: #ffaa8e;
  color: #fff;
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
`

export const ErrorText = styled.p`
  font-size: 16px;
  color: red;
`

export const Footer = styled.div`
  background-color: #eaeaea;
  padding: 15px;
  text-align: center;
  font-size: 12px;
  color: #777;
  position: fixed;
  bottom: 0;
  width: 100%;
`
