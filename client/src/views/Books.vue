<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm-10">
          <h1>Books</h1>
          <hr />
          <br />
          <b-alert v-model="isShowMessage" dismissible show>{{message}}</b-alert>
          <br />
          <button type="button" class="btn btn-success btn-sm" v-b-modal.book-modal>Add Books</button>
          <br />
          <br />
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Read?</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in books" :key="index">
                <td>{{item.title}}</td>
                <td>{{item.author}}</td>
                <td>{{item.read}}</td>
                <td>
                  <button type="button" class="btn btn-warning btn-sm" @click="editBook(item)">Update</button>
                  <button type="button" class="mx-1 btn btn-danger btn-sm" @click="deleteBook(item)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <b-modal ref="addBookModal" id="book-modal" title="Add a new book" hide-footer>
      <b-form @submit="onSubmit" @reset="onReset" class="w-100">
        <b-form-group label="Title" label-for="form-title-input">
          <b-form-input id="form-title-input" type="text" v-model="addBookForm.title" required></b-form-input>
        </b-form-group>
        <b-form-group label="Author" label-for="from-author-input">
          <b-form-input id="form-author-input" type="text" v-model="addBookForm.author" required></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-checkbox-group v-model="addBookForm.read">
            <b-form-checkbox value="true">Read?</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: [],
      addBookForm:{
        id:'',
        title:'',
        author:'',
        read:[],
      },
      message:"hello",
      isShowMessage:false,
    };
  },
  methods: {
    getBooks() {
      this.axios
        .get("/books")
        .then(res => {
          this.books = res.data.books;
          console.log(res.data.books);
        })
        .catch(err => {
          console.log(err);
        });
    },
    addBook(payload){
      this.axios.post('/books',payload).then(()=>{
        this.getBooks()
        this.message="Book added!"
        this.isShowMessage=true
      }).catch(err=>{
        console.log(err)
        this.getBooks()
      })
    },
    updateBook(payload){
      this.axios.put(`/books/${payload.id}`,payload).then(()=>{
        this.getBooks()
        this.message="Book update"
        this.isShowMessage=true
      }).catch(err=>{
        console.log(err)
        this.getBooks()
      })
    },
    initForm(){
      this.addBookForm.title=''
      this.addBookForm.author=''
      this.addBookForm.read=[]
    },
    onSubmit(event){
      event.preventDefault()
      this.$refs.addBookModal.hide()
      let read=false
      if(this.addBookForm.read[0]) read=true
      const payload={
        id:this.addBookForm.id,
        title:this.addBookForm.title,
        author:this.addBookForm.author,
        read:read
      }
      let flag=false
      this._.forEach(this.books,value=>{
        if(value.id==this.addBookForm.id){
          this.updateBook(payload)
          flag=true
        }
      })

      if(!flag)this.addBook(payload)
      this.initForm()
    },
    onReset(event){
      event.preventDefault()
      this.$refs.addBookModal.hide()
      this.initForm()
    },
    editBook(book){
      this.$refs.addBookModal.show()
      this._.forEach(book,(value,key)=>{
        if(key!=='read')this.addBookForm[key]=value
        else{
          if(book['read'])this.addBookForm['read']=[true]
        }
      })
    },
    deleteBook(book){
      this.axios.delete(`/books/${book.id}`,book).then(()=>{
        this.message="Book delete"
        this.isShowMessage=true
        this.getBooks()
      })
    }
  },
  created() {
    this.getBooks();
  }
};
</script>

