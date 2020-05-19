import React from 'react';
import abIcon from '../../img/medical.svg'
import dbIcon from '../../img/SVG/database.svg';
import codeIcon from '../../img/SVG/code.svg';

 const header = () => {
        return(
            <header className="header">
                <div className="header__title">
                    <img src={abIcon} alt="antibody-icon" className="header__title__logo" />
                    <span className="header__title__text">
                        <b>ABDesign</b> - Webapp for antibody humanization
                    </span>
                </div>
                    <ul className="nav__links" >
                        <li className="notLast"><a href="#"><img alt="database-icon" src={dbIcon}/></a></li>
                        <li><a target="_blank" href="https://pypi.org/project/abdesign/"><img alt="code-icon" src={codeIcon}/></a></li>
                    </ul>
            </header>
        )
}

export default header;