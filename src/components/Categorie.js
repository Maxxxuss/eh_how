import React from "react"
import { connect } from "react-redux";
import {setCategorie} from '../actions/categorie'
import { getAllCategories } from "../selectors/categories";

import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

class Categories extends React.Component {
    state = {
      activeCategorie: "",
      user: this.props.currentUser,
      categorie: [],
      categorieName: "",
      categorieDetails: "",
      categoriesRef: this.props.categories, 
      modal: false,
      firstLoad: true
    };
  
    componentDidMount() {
      this.addListeners();
      console.log("Categorie Ref", this.state.categoriesRef);
    }
  

    addListeners = () => {
      let loadedCategories = [];
      this.setState({ categorie: loadedCategories }, () => this.setFirstCategorie());

    };
  
    removeListeners = () => {
      this.state.categoriesRef.off();
    };
  
    setFirstCategorie = () => {
      const firstCategorie = this.state.categorie[0];
      if (this.state.firstLoad && this.state.categorie.length > 0) {
        this.props.setCategorie(firstCategorie = this.props.setCategorie.catName["Hello"]);
        this.setActiveCategorie(firstCategorie);
      }
      this.setState({ firstLoad: false });
    };
  
    addCategorie = () => {
      const { categoriesRef, categorieName, categorieDetails, user } = this.state;
  
      const key = categoriesRef.push().key;
  
      const newCategorie = {
        // id: key,
        catName: categorieName,
        details: categorieDetails,
      };
  
      categoriesRef
        .child(key)
        .update(newCategorie)
        .then(() => {
          this.setState({ categorieName: "", categorieDetails: "" });
          this.closeModal();
          console.log("categorie added");
        })
        .catch(err => {
          console.error(err);
        });
    };
  
    handleSubmit = event => {
      event.preventDefault();
       {
        this.addCategorie();
      }
    };
  
    handleChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
  
    changeCategorie = categorie => {
      this.setActiveCategorie(categorie);
      this.props.setCategorie(categorie);
      this.props.setNotesOnCategorie(categorie)

      console.log("Categorie.id lautet: " + categorie.id)
    };
  
    setActiveCategorie = categorie => {
      this.setState({ activeCategorie: categorie.id });
    };
  
    displayCategories = categorie =>
      categorie.length > 0 &&
      categorie.map(categorie => (
        <Menu.Item
          key={categorie.id}
          onClick={() => this.changeCategorie(categorie)}
          name={categorie.catName}
          style={{ opacity: 0.7 }}
          active={categorie.id === this.state.activeCategorie}
        >
          # {categorie.catName}
        </Menu.Item>
      ));
  

  
    openModal = () => this.setState({ modal: true });
  
    closeModal = () => this.setState({ modal: false });
  
    render() {
      const { categorie, modal } = this.state;
  
      return (
        <React.Fragment>
          <Menu.Menu style={{ paddingBottom: "2em" }}>
            <Menu.Item>
              <p>
                <Icon name="exchange" /> CategorieS
              </p>{" "}
              ({categorie.length}) <Icon name= "add" onClick={this.openModal} />
            </Menu.Item>
            {this.displayCategories(categorie)}
          </Menu.Menu>
  
          {/* Add Categorie Modal */}
          <Modal basic open={modal} onClose={this.closeModal}>
            <Modal.Header>Add a Categorie</Modal.Header>
            <Modal.Content>
              <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                  <Input
                    fluid
                    label="Name of Categorie"
                    name="categorieName"
                    onChange={this.handleChange}
                  />
                </Form.Field>
  
                <Form.Field>
                  <Input
                    fluid
                    label="About the Categorie"
                    name="categorieDetails"
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Form>
            </Modal.Content>
  
            <Modal.Actions>
              <Button color="green" inverted onClick={this.handleSubmit}>
                <Icon name="checkmark" /> Add
              </Button>
              <Button color="red" inverted onClick={this.closeModal}>
                <Icon name="remove" /> Cancel
              </Button>
            </Modal.Actions>
          </Modal>
        </React.Fragment>
      );
    }
  }

  const mapStateToProps = (state)=>{
    return{
        categories: getAllCategories(state), 
        
    }
}

const mapDispatchToProps =(dispatch) =>({
    setCategorie: (categorie) => dispatch(setCategorie(categorie))

}) 

export default connect(
    mapStateToProps, 
    mapDispatchToProps)
    (Categories)
