/**
 * Sidebar
 */
import React, { Component, Fragment } from 'react';
import './style.scss';

// components
import FormModal from '../../components/formModal';

type Icon = {
  name: string,
  label: string
}

type Props = {
  history: Object,
  children: Array<Object>,
  location: Object,
  toggleSidebar: ()=>void,
  isOpenSidebar: boolean
}

type State = {
  status: string,
  viewAlert: boolean,
  authorizedIcons: Array<Icon>
}

class Sidebar extends Component <Props, State>{
  static defaultProps: Object;

  state = {
    status: 'hide',
    viewAlert: false,
    authorizedIcons: [
      { name: 'services', label: 'Prestaciones' },
      { name: 'users', label: 'Usuarios' },
      { name: 'resources', label: 'Recursos' },
      { name: 'patients', label: 'Patientes' },
      { name: 'reports', label: 'Reportes' },
      { name: 'schedule', label: 'Agendamiento' },
      { name: 'core2', label: 'Core 2', link: 'https://core.sicor.com.co/' },
      { name: 'core3', label: 'Core 3', link: 'https://core3.sicor.com.co/' },
      {
        name: 'results',
        label: 'Resultados',
        link: 'https://resultados.sicor.com.co/'
      }
    ]
  };

  _changePath = (path: string, verificate: boolean = true) => {
    if (verificate) {
      const inProcess = localStorage.getItem('inProcess');
      if (inProcess) {
        console.log('alert process') // eslint-disable-line
        return;
      }
    }
    // @ts-ignore
    this.props.history.push(`/${path}`);
  };

  render () {
    // @ts-ignore
    const path = this.props.location.pathname.split('/')[1]; // eslint-disable-line
    const { authorizedIcons, status } = this.state; // eslint-disable-line
    const { toggleSidebar, isOpenSidebar, children } = this.props;
    return (
      <Fragment>
        {
          isOpenSidebar && <FormModal />
        }
        <div className="content collapsed-content">
          <div className="disable-background"></div>
        </div>
        <div className={`sidebar ${isOpenSidebar? 'opened': 'collapsed'}`}>
          <div className={'toggle-icon icon-container text-center'}>
            <i
              onClick={toggleSidebar}
              className="large material-icons clickable"
            >
              {/* arrow_forward */}
            </i>
          </div>
          <div className="sidebar-icons">
            {
              children
              /*
              authorizedIcons.map((icon, index) => {
                if (permissionKey.indexOf(icon.name) < 0) return null;
                return !icon.link && (
                  <div
                    className={`sidebar-item ripple flex j-sb a-i-c ${path === icon.name ? 'active-item' : ''} ${icon.name}`}
                    onClick={()=>setTimeout(this._changePath(icon.name), 300)}
                    key={index}
                  >
                    <span className="name">{icon.label}</span>
                    <div className={'icon-container text-center '}>
                      <span id={index} className={'clickable icon-' + icon.name} />
                    </div>
                  </div>
                );
              })
              */
            }
          </div>
        </div>

      </Fragment>
    );
  }
}
Sidebar.defaultProps = {
  // permissionKey: []
};
export default Sidebar;