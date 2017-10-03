<template>
	<div>
		<v-card>
			<div @click="singleView(keep)">
				<v-card-media :src="keep.url" height="200px">
				</v-card-media>
				<v-card-title primary-title>
					<div>
						<h3 class="headline mb-0">{{keep.title}}</h3>
						<div>{{keep.description}}</div>
					</div>
				</v-card-title>
			</div>
			<v-card-actions>
				<v-btn flat class="orange--text">Share</v-btn>
				<v-btn flat class="orange--text add-keep" @click="selectKeep">Keep</v-btn>
			</v-card-actions>
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
			}
		},
		methods: {
			singleView(keep) {
				router.push('/keeps/' + keep._id)
			},
			selectKeep() {
				this.$store.dispatch('selectKeep', this.keep._id)
				this.$store.dispatch('showBottomVaultsBar')
			}
		}
	}

</script>