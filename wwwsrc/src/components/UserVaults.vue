<template>
	<v-container grid-list-md>
		<v-layout row wrap>
			<v-flex xs12>
				<v-card dark class="primary">
					<v-card-text class="px-0">My Vaults</v-card-text>
				</v-card>
			</v-flex>
			<v-flex xs4 v-for="vault in userVaults">
				<Vault :vault="vault"></Vault>
			</v-flex>
		</v-layout>
		<v-btn id="add-vault" primary fab fixed bottom right v-model="fab" @click="dialog = true">
			<v-icon>add</v-icon>
		</v-btn>
		<v-dialog v-model="dialog" persistent width="50%">
			<v-card>
				<v-card-title>
					<span class="headline">Create New Vault</span>
				</v-card-title>
				<v-card-text>
					<v-container grid-list-md>
						<v-layout wrap>
							<v-flex xs12>
								<v-text-field label="Title" required v-model="title"></v-text-field>
							</v-flex>
							<v-flex xs12>
								<v-text-field label="Description" v-model="description"></v-text-field>
							</v-flex>
							<v-switch label="Private" v-model="private"></v-switch>
						</v-layout>
					</v-container>
					<small>*indicates required field</small>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn class="blue--text darken-1" flat @click="closeDialog">Cancel</v-btn>
					<v-btn class="blue--text darken-1" flat @click="createVault">Create</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-container>
</template>

<script>
	import Vault from './Vault'
	export default {
		name: 'UserVaults',
		data() {
			return {
				fab: false,
				dialog: false,
				title: '',
				description: '',
				private: false
			}
		},
		methods: {
			closeDialog() {
				this.dialog = false,
					this.title = '',
					this.description = '',
					this.private = false
			},
			createVault() {
				var newVault = {
					title: this.title,
					description: this.description,
					// private: this.private
				}
				this.$store.dispatch('addVault', newVault)
				this.closeDialog()
			}
		},
		computed: {
			userVaults() {
				return this.$store.state.userVaults
			}
		},
		beforeMount() {
			// this.$store.dispatch('getUserVaults')
		},
		components: {
			Vault
		}
	}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1,
	h2 {
		font-weight: normal;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42b983;
	}

	#add-vault {
		z-index: 9999;
	}
</style>