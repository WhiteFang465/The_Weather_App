import React from "react";
import styles from "./Header.module.css";

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = { headerName: this.props.headerName };
    }
    render() {
        return (
            <header className={styles.headerBlue}>
                <h2>{this.state.headerName}</h2>
            </header>
        );
    }
}
export default Header;
