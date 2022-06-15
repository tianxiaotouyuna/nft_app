module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['./root'], //表示哪个目录开始设置绝对路径
                alias: {
                    //别名的配置
                    '@/pages': './root/pages',
                    '@/routes': './root/routes',
                    '@/styles': './root/styles',
                    '@/utils': './root/utils',
                    '@/store': './root/store',
                    '@/action': './root/action',
                    '@/constants': './root/constants',
                    '@/provider': './root/provider',
                    '@/reducers': './root/reducers',
                    '@/hooks': './root/hooks',
                    '@/resources': './root/resources',
                    '@/components': './root/components',
                    '@/pageranges': './root/pageranges',
                    '@/request': './root/request',
                    '@/services': './root/services'

                },
            },
        ],
    ],
};