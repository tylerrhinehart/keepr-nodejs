<template>
    <v-bottom-sheet v-model="sheet">
        <v-list>
            <v-subheader>Click Vault to Add Keep to</v-subheader>
            <v-list-tile v-for="vault in userVaults" :key="vault.title" @click="addToVault(vault._id)">
                <!-- <v-list-tile-avatar>
                        <v-avatar size="32px" tile>
                          <img :src="`/static/doc-images/bottom-sheets/${tile.img}`" :alt="tile.title">
                        </v-avatar>
                      </v-list-tile-avatar> -->
                <v-list-tile-title>{{ vault.title }}</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </v-bottom-sheet>
</template>

<script>
    export default {
        name: 'BottomVaultsBar',
        data() {
            return {
                sheet: false
            }
        },
        methods: {
            selectVault() {
                event.stopPropagation()
                this.sheet = true
            },
            addToVault(vaultId) {
                var keepToAdd = {
                    keepId: null,
                    vaultId: vaultId
                }
                // console.log(keepToAdd)
                this.sheet = false
                this.$store.dispatch('addToVault', keepToAdd)
            }
        },
        watch: {
            showBottomVaultsBar: function (show) {
                this.selectVault()
            }
        },
        computed: {
            userVaults() {
                return this.$store.state.userVaults
            },
            showBottomVaultsBar() {
                return this.$store.state.showBottomVaultsBar
            }
        },
        created() {
            // var _this = this
            // var elems = document.getElementsByClassName('add-keep')
            // $(elems).click(function (event) {
            //     console.log('clicked')
            //     _this.$store.dispatch('showBottomVaultsBar')
            // })
        }
    }

</script>