<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card dark class="primary">
                    <v-card-text class="px-0">Search Results</v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs4 v-for="(keep, i) in keeps" :key="i">
                <Keep :keep="keep"></Keep>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Keep from './Keep'
    export default {
        name: 'SearchPage',
        data() {
            return {
            }
        },
        methods: {
        },
        computed: {
            keeps() {
                return this.$store.state.searchResults
            },
            loggedIn() {
                return this.$store.state.loggedIn
            }
        },
        components: {
            Keep
        }
    }

</script>

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

    #add-keep {
        z-index: 9999;
    }
</style>