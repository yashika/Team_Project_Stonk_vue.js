<template>
  <form class="search__box">
		<input type="text" :placeholder="getPlaceHolder" class="search__input" v-model="searchItem" v-on:keydown.enter.prevent="onSearch"/>
    <section class="toggle__icon">
      <span v-if="name === 'community'" @click="onSearchChange">
        <i class="fas fa-toggle-off" v-show="targetSerach"></i>
        <i class="fas fa-toggle-on" v-show="!targetSerach"></i>
      </span>
      <span class="cancel__button" @click="onSearchCancel">
        <i class="fas fa-redo"></i>
      </span>
    </section>
		<span class="search__button" @click="onSearch">
			<i class="fas fa-search"></i>
		</span>
	</form>
</template>

<script>
export default {
  props: {
    placeholder: String,
    name: String,
  },
  data(){
    return{
      searchItem: "",
      targetItem: "",
      isSearch: false,
      target: "post",
    }
  },
  methods: {
    // 검색기능 ON
		onSearch(){
      this.$emit("onSearch", this.searchItem, this.target);
      this.searchItem = "";
		},

		// 검색기능 OFF
		onSearchCancel(){
      this.$emit("onSearchCancel");
      this.searchItem = "";
		},

    onSearchChange(){
      this.target = this.target === "post" ? "user" : "post";
    }
  },
  computed: {
    getPlaceHolder(){
      if(this.target === 'post'){
        return "게시글검색";
      }
      return "유저검색";
    },
    targetSerach(){
      if(this.target === 'post'){
        return true;
      }
      return false;
    }
  }
}
</script>

<style scoped>
	.search__box{
    background-color: white;
    width: 25vw;
    height: 7vh;
    border-radius: 0.5em;
		margin-bottom: 2em;
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
	}

	/* 검색인풋태그 */
	.search__input{
    border: 0px;
    margin: 7px 0px;
    width: 15vw;
    margin-left: 0.5em;
    font-size: inherit;
	}

	/* 검색인풋태그기본 스타일없애기 */
	.search__input:focus{
    outline: 0px;
  }

	/* 검색버튼태그 */
	.search__button{
    background: linear-gradient(to right, #6478FB, #8763FB);
    width: 15%;
    border-radius: 0 0.5em 0.5em 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1vw;
	}

  .toggle__icon{
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    width: 12%;
    font-size: 1vw;
  }

	@media screen and (max-width: 768px){
    .search__box{
      height: 4vh;
      font-size: 0.5rem;
    }
	}
</style>