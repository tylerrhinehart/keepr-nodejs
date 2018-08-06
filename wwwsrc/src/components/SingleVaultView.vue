<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card dark class="primary">
                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">{{activeVault.title}}</h3>
                            <div>{{activeVault.description}}</div>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
            <v-flex xs4 v-for="(keep, i) in activeVaultKeeps" :key="i">
                <Keep :keep="keep"></Keep>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Keep from './Keep'
    export default {
        name: 'SingleVaultView',
        data() {
            return {

            }
        },
        computed: {
            activeVault() {
                return this.$store.state.activeVault
            },
            activeVaultKeeps() {
                return this.$store.state.activeVaultKeeps
            }
        },
        mounted() {
            this.$store.dispatch('getVaultKeeps', this.$route.params.vaultId)
        },
        components: {
            Keep
        }
    }

</script>