import React, {Component} from 'react';
import Downshift from 'downshift'
import {matchSorter} from 'match-sorter'
import styled from '@emotion/styled'
import { css as emoCSS } from '@emotion/css'
import { connect } from 'react-redux'
import { editExpense } from '../actions/notes';

import { getAllCategories } from '../selectors/categories'
import { getAllExpenses } from '../selectors/notes'



class DropDownCategorie extends Component {
  constructor (props){
    super(props)
    this.state = {
      allCategories: this.props.categories,
      catName: "", 
      actCategorie: "",
      activeNote: this.props.activeNote,
      activeNote:"", 
      isOpen: "" ,
      notes: "",
      categorie: ""
        }
        
      }
       getItems(filter) {
         
         const allItems = this.props.categories
          return filter
            ? matchSorter(allItems, filter, {
                keys: ['catName'],
              })
            : allItems
        }

      onContentChange = (e) => {
        const categorie = e.target.value
        this.setState (()=> ({categorie}))
        // console.log(categorie)
        console.log(categorie)
      }

      onNoteEdit = () => {
        const categorie = this.state.categorie.catName ? this.state.categorie.catName :this.props.activeNote.categorie.catName

       const updates = {categorie}

        this.props.editExpense(this.props.activeNote.id, updates)
        console.log("Cat update:", categorie);
      
      }



      handleSearchChange = itemToString => {
        this.setState(
          {
            categorie: itemToString
          },
          () => this.onNoteEdit()
        );
      }

       stateReducer = (state, changes) => {
        // this prevents the menu from being closed when the user
        // selects an item with a keyboard or mouse
        switch (changes.type) {
          case Downshift.stateChangeTypes.keyDownEnter:
          case Downshift.stateChangeTypes.clickItem:
            return {
              ...changes,
              isOpen: state.isOpen,
              highlightedIndex: state.highlightedIndex,
            }
          default:
            return changes
        }
      }

      
      render () {
        const {activeNote} = this.props
        return (
        <div
        {...css({
          display: 'flex',
          flexDirection: 'column',
          marginTop: 50,
        })}
        >

        <Downshift
        stateReducer={ this.stateReducer}


          onChange={(itemToString)=>
            {
              this.handleSearchChange(itemToString)
            }
          }
          itemToString={itemToString}
        >
          {({
            getLabelProps,
            getInputProps,
            getToggleButtonProps,
            getMenuProps,
            getItemProps,
            isOpen,
            clearSelection,
            selectedItem,
            inputValue,
            highlightedIndex,
          }) => (
            <div {...css({width: 250, margin: 'auto'})}>
              <Label {...getLabelProps()}>Select categorie</Label>
              <div {...css({position: 'relative'})}>
                <Input
                placeholder= {this.props.acctiveNote ? this.state.categorie : "Categorie" }
                // value ={this.state.categorie}
                onChange = {this. onContentChange}

                  {...getInputProps({
                    isOpen,
                    placeholder: activeNote ? activeNote.categorie : "Categorie" , 
                    value: this.state.catName

                   } 
                  )}
                />

                {selectedItem ? (
                  <ControllerButton
                    onClick={clearSelection}
                    aria-label="clear selection"
                  >
                    <XIcon />
                  </ControllerButton>
                ) : (
                  <ControllerButton {...getToggleButtonProps()}>
                    <ArrowIcon isOpen={isOpen} />
                  </ControllerButton>
                )}
              </div>
              <div {...css({position: 'relative'})}>
                <BaseMenu {...getMenuProps(isOpen)}>
                  {isOpen
                    ? this.getItems(inputValue).map((item, index) => (
                        <Item
                          key={item.id}
                          // onChange = {this.onContentChange}
                          {...getItemProps({
                            item,
                            index,
                            isActive: highlightedIndex === index,
                            isSelected: selectedItem === item,
                          })}
                        >
                          {itemToString(item)}, 
                        </Item>
                      ))

                    : null}
                </BaseMenu>
              </div>

            </div>
          )}
        </Downshift>
      </div>
      )

 }
}


const Label = styled('label')({
  fontWeight: 'bold',
  display: 'block',
  marginBottom: 10,
})



const ControllerButton = styled('button')({
  backgroundColor: 'transparent',
  border: 'none',
  position: 'absolute',
  right: 0,
  top: 0,
  cursor: 'pointer',
  width: 47,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
})
const onAttention = '&:hover, &:focus'
const Input = styled('input')(
  {
    width: '60%', // full width - icon width/2 - border
    fontSize: 14,
    wordWrap: 'break-word',
    outline: 0,
    whiteSpace: 'normal',
    background: '#fff',
    display: 'inline-block',
    boxShadow: 'none',
    border: '1px solid rgba(34,36,38,.15)',
    borderRadius: '.30rem',
    transition: 'box-shadow .1s ease,width .1s ease',
    [onAttention]: {
      borderColor: '#96c8da',
      boxShadow: '0 2px 3px 0 rgba(34,36,38,.15)',
    },
  },
  ({isOpen}) =>
    isOpen
      ? {
          borderBottomLeftRadius: '0',
          borderBottomRightRadius: '0',
          [onAttention]: {
            boxShadow: 'none',
          },
        }
      : null,
)

const Item = styled('li')(
  {
    position: 'relative',
    cursor: 'pointer',
    display: 'block',
    border: 'none',
    height: 'auto',
    textAlign: 'left',
    borderTop: 'none',
    lineHeight: '1em',
    color: 'rgba(0,0,0,.87)',
    fontSize: '1rem',
    textTransform: 'none',
    fontWeight: '400',
    boxShadow: 'none',
    padding: '.8rem 1.1rem',
    whiteSpace: 'normal',
    wordWrap: 'normal',
  },
  ({isActive, isSelected}) => {
    const styles = []
    if (isActive) {
      styles.push({
        color: 'rgba(0,0,0,.95)',
        background: 'rgba(0,0,0,.03)',
      })
    }
    if (isSelected) {
      styles.push({
        color: 'rgba(0,0,0,.95)',
        fontWeight: '700',
      })
    }
    return styles
  },
)

function ArrowIcon({isOpen}) {
  return (
    <svg
      viewBox="0 0 20 20"
      preserveAspectRatio="none"
      width={16}
      fill="transparent"
      stroke="#979797"
      strokeWidth="1.1px"
      transform={isOpen ? 'rotate(180)' : undefined}
    >
      <path d="M1,6 L10,15 L19,6" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      preserveAspectRatio="none"
      width={12}
      fill="transparent"
      stroke="#979797"
      strokeWidth="1.1px"
    >
      <path d="M1,1 L19,19" />
      <path d="M19,1 L1,19" />
    </svg>
  )
}

const css = (...args) => ({className: emoCSS(...args)})

const itemToString = (i) => (i ? i.catName : '')

const BaseMenu = styled('ul')(
  {
    padding: 0,
    marginTop: 0,
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    maxHeight: '20rem',
    overflowY: 'auto',
    overflowX: 'hidden',
    outline: '0',
    transition: 'opacity .1s ease',
    borderRadius: '0 0 .28571429rem .28571429rem',
    boxShadow: '0 2px 3px 0 rgba(34,36,38,.15)',
    borderColor: '#96c8da',
    borderTopWidth: '0',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderStyle: 'solid',
  },
  ({isOpen}) => ({
    border: isOpen ? null : 'none',
  }),
)

const Menu = React.forwardRef((props, ref) => (
  <BaseMenu innerRef={ref} {...props} />
))

const mapStateToProps = (state)=>{
  return{
      expenses : getAllExpenses(state).sort((a,b) => (a.prio > b.prio) ? -1: 1), 
      categories: getAllCategories(state), 
      
  }
}

const mapDispatchToProps =(dispatch) =>({
  editExpense: (id, updates) => dispatch(editExpense(id, updates)), 


}) 

export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )
  (DropDownCategorie)


