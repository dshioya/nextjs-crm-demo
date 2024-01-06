'use client'

import {createContext, useContext, useState, Fragment, ReactNode} from 'react'
import NavBar from './NavBar'
import {SessionProvider} from 'next-auth/react'

interface INavBarContext {
  showNavBar: (title: string) => void;
  hideNavBar: () => void;
  visible: boolean;
  title: string;
}

const NavBarContext = createContext<INavBarContext>({
  showNavBar: title => {},
  hideNavBar: () => {},
  visible: false,
  title: ''
})

export function useNavBarContext() {
  return useContext(NavBarContext)
}

export function NavBarProvider({children}: { children: ReactNode }) {
  const [visible, setVisible] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')

  function showNavBar(title: string) {
    setTitle(title)
    setVisible(true)
  }

  function hideNavBar() {
    setVisible(false)
    setTitle('')
  }

  return (
    <SessionProvider>
      <Fragment>
        {visible && <NavBar title={title}/>}
        <NavBarContext.Provider value={{showNavBar, hideNavBar, visible, title}}>{children}</NavBarContext.Provider>
      </Fragment>
    </SessionProvider>
  )
}
