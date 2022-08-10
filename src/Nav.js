/* eslint-disable no-useless-constructor */
import React from "react";
import styles from "./Nav.module.css";

class Nav extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <nav>
                <ul className={styles.ul}>
                    <li className={styles.li} key={0}>
                        <a href="/">Home</a>
                    </li>
                    {/* <li className={styles.li} key={1}>
                        <a href="http://localhost:3000/">Profile</a>
                    </li>
                    <li className={styles.li} key={2}>
                        <a href="http://localhost:3000/">Products</a>
                    </li> */}
                </ul>
            </nav>
        );
    }
}
export default Nav;
//ReactDOM.render(<Nav/>,document.getElementById('root'))
