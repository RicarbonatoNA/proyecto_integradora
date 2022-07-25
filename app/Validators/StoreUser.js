'use strict'

const {formatters} = use ('validator')

class StoreUser {
  get rules () {
    return {
      email:'required|email|max:180|unique:users,email',
      password:'required|max:100'
    }
  }
  get validateAll(){
    return true 
  }

  get formatter(){
    return this.formatter.JsonApi
  }
}

module.exports = StoreUser
