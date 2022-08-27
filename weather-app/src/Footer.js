import React from "react";
import styles from "./Footer.module.css"

class Footer extends React.Component{
    constructor(props){
        super(props)
        this.state= {authorName:this.props.authorName}
    }
     render(){
         return(
             <footer className={styles.footer}>
             <h4 >
              powered by {this.state.authorName}
             </h4>

           </footer>
         )
     }
}
export default Footer