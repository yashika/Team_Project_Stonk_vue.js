<template>
	<div id="item-table">
		<template v-if="error">
			<h1>{{ error.message }}</h1>
			<p>{{ error.error }}</p>
		</template>

		<template v-else>
			<search-box placeholder="아이템검색" @onSearch="onSearch" @onSearchCancel="onSearchCancel" />

			<div id="table-header">
				<div class="table-gride image">이미지</div>
				<div class="table-gride name" style="position: relative;">
					아이템명
					<i class="fas fa-sort-alpha-up sort-button icon-1" @click="onOrderByNameAsc"/>
					<i class="fas fa-sort-alpha-down sort-button  icon-2" @click="onOrderByNameDesc"/>
				</div>
				<div class="table-gride price" style="position: relative;">
					가격
					<i class="fas fa-sort-numeric-up sort-button icon-1" @click="onOrderByPriceAsc"/>
					<i class="fas fa-sort-numeric-down sort-button icon-2" @click="onOrderByPriceDesc"/>
				</div>
			</div>

			<div id="table-body">
				<div v-for="(imageName, index) in itemNameList" :key="index">
					<span v-show="!isSearch || onSearchFind(imageName)" id="items">
						<div class="table-gride image" ><img :src="getPath(imageName)" :alt="imageName"></div>
						<div class="table-gride name">{{ imageName }}</div>
						<div class="table-gride price">{{ getPrice(imageName) }}</div>
					</span>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
import searchBox from '../components/common/search-box.vue';

export default {	
	components: {
		searchBox
	},
	data(){
		return{
			imagePath: "../image/items/",
			itemNameList: [],
			targetItem: "",
			isSearch: false,
			isOrderByNameDesc: false,
			isOrderByPriceDesc: false,
			reloadTimerId: 0,
			error: "",
			items: [],
		}
	},
	methods: {
		// item의 path가져오기
		getPath(imageName){
			return this.imagePath + imageName + '.png';
		},

    // 검색기능 ON
		onSearch(searchItem){
			this.targetItem = searchItem;
			this.isSearch = true;
		},


		// 검색기능 OFF
		onSearchCancel(){
			this.isSearch = false;
			this.targetItem = "";
		},

		// 검색에서 해당하는것만 화면에 띄워주기
		onSearchFind(imageName){
			// 문자열을 내부에 하지않으면 -1리턴
			if(imageName.toLowerCase().indexOf(this.targetItem.toLowerCase()) !== -1){
				return true;
			} else {
				return false;
			}
		},

		// 아이템 가격 가져오기
		getPrice(imageName){
			return this.items[imageName];
		},

		// 이름 오름차순 정렬
		onOrderByNameAsc(){
			this.items = Object.keys(this.items)
			.sort((a, b) => a < b ? -1 : a > b ? 1 : 0)
			.reduce(
				(obj, key) => { 
					obj[key] = this.items[key];

					return obj;
				}, {});

			this.itemNameList = Object.keys(this.items);
		},

		// 이름 내림차순 정렬
		onOrderByNameDesc(){
			this.items = Object.keys(this.items)
			.sort((a, b) => a > b ? -1 : a < b ? 1 : 0)
			.reduce(
				(obj, key) => { 
					obj[key] = this.items[key];
					return obj;
				}, {});

			this.itemNameList = Object.keys(this.items);
		},

		// 가격 오름차순 정렬
		onOrderByPriceAsc(){
			const arr = [];

			// 객체 배열로 만들고
			for(const item in this.items){
				arr.push([item, this.items[item]]);
			}

			// 가격기준으로 정렬하고
			arr.sort((x, y) => {
				return x[1] - y[1];
			});

			//다시 객체로 만들고
			this.items = Object.fromEntries(arr);

			// 적용
			this.itemNameList = Object.keys(this.items);
		},

		// 가격 내림차순 정렬
		onOrderByPriceDesc(){
			let arr = [];

			for(const item in this.items){
				arr.push([item, this.items[item]]);
			}

			arr.sort((x, y) => {
				return y[1] - x[1];
			});

			this.items = Object.fromEntries(arr);

			this.itemNameList = Object.keys(this.items);
		}
	},
	computed: {
		fetchItems(){
			return this.$store.state.items.data;
		}
	},
	async created(){
		// 5분에 한번씩 데이터만 새로고침
		this.reloadTimerId = setInterval(async () => {
			await this.$store.dispatch('FETCH_ITEMS');
			this.items = this.fetchItems;
		}, 1000 * 60 * 5);
		await this.$store.dispatch('FETCH_ITEMS');

		this.items = this.fetchItems;

		if(this.items.error){
			this.error = this.items;
		}

		this.itemNameList = Object.keys(this.items);
	},
	beforeDestroy(){
		clearTimeout(this.reloadTimerId);
	},
}
</script>

<style scoped>
	/* 이미지태그 크기 및 위치지정 */
	img{
		width: 50px;
		height: 50px;
		margin-top: 5px;
	}

	/* 테이블제목들이랑 아이템들 정렬을 위해 값적용 */
	#table-header, #items{
		display: flex;
		flex-direction: row;	/* 아이템방향 */
		flex-wrap: nowrap;		/* 아이템 넘치면 크기줄이기 */
		/* flex-flow: dir wrap; 로 축약가능 */
		justify-content: flex-start;
	}

	/* 테이블제목 색지정 */
	#table-header > div{
		background: gray;
	}

	/* 테이블 각 요소마다 간격등의 값지정 */
	.table-gride{
		height: 60px;
		border: 1px solid white;
		text-align: center;
		line-height: 60px;
		background-color: lightgray;
	}
	
	/* 테이블에 마우스 올렸을때 한라인 색변화 */
	#items:hover > .table-gride{
		background: lightslategray;
	}

	/* 이미지grid값적용 */
	.image{
		width: 100px;
		flex-grow: 1;
	}

	/* 이름grid값적용 */
	.name{
		width: 200px;
		flex-grow: 2;
	}

	/* 가격grid값적용 */
	.price{
		width: 200px;
		flex-grow: 2;
	}

	/* 생성시간grid값적용 */
	.created_at{
		width: 250px;
		flex-grow: 3;
	}
	.icon-1{
		position: absolute;
		right: 0px;
		top: 0px
	}
	.icon-2{
		position: absolute;
		right: 34px;
		top: px
	}

	/* 정렬버튼 */
	.sort-button{
		float: right;
		margin-top: 18px;
		margin-right: 10px;
		cursor: pointer;
		color: white;
	}
</style>