import React from 'react';

 const footer = () => {
        return(
            <footer className="footer">
                    <p className="footer__copyright">&copy; 2020 Institute of Computational Biology (ICB) at Helmholtz Zentrum München</p>
                    <ul className="footer__links" >
                        <li className="notLast"><a href="#">Legal Notice</a></li>
                        <li><a target="_blank" href="https://pypi.org/project/abdesign/">Privacy Statement</a></li>
                    </ul>
            </footer>
        )
}

export default footer;