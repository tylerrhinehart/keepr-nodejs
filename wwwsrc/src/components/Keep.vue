<template>
	<div>
		<v-card>
			<v-card-media :src="keep.url" height="200px" @click="singleView">
			</v-card-media>
			<v-card-title class="blue white--text">
				<span class="headline">{{keep.title}}</span>
				<v-spacer></v-spacer>
				<v-menu bottom right>
					<v-btn icon slot="activator" dark>
						<v-icon>more_vert</v-icon>
					</v-btn>
					<v-list>
						<v-list-tile v-for="item in items" :key="item.title" @click="item.function">
							<v-list-tile-title>{{ item.title }}</v-list-tile-title>
						</v-list-tile>
					</v-list>
				</v-menu>
			</v-card-title>
		</v-card>
	</div>
</template>

<script>
	import router from "../router"
	export default {
		name: 'Keep',
		props: ["keep"],
		data() {
			return {
				items: [
					{
						title: 'Keep',
						function: this.selectKeep
					},
					{
						title: 'Full Size',
						function: this.singleView
					},
					{
						title: 'Share',
						function: ''
					}
				]
			}
		},
		methods: {
			singleView() {
				router.push('/keeps/' + this.keep._id)
			},
			selectKeep() {
				this.$store.dispatch('selectKeep', this.keep._id)
				this.$store.dispatch('showBottomVaultsBar')
			},
			deleteKeep() {
				this.$store.dispatch('deleteKeep', this.keep._id)
			}
		},
		mounted() {
			if (this.$store.state.user._id == this.keep.creatorId) {
				var remove = {
					title: 'Remove',
					function: this.deleteKeep
				}
				this.items.push(remove)
			}
		}
	}

</script>