/**
 * 添加算法的模板
 */

export default {
    "0": [
        {
            name: "算法基础信息",
            type: "base",
            components: [
                {
                    name: "算法名",
                    type: "VInput",
                    model: "algname",
                    towards:'row',
                    src: "",
                    value: ""
                },
                {
                    name: "类名",
                    type: "VInput",
                    model: "classname",
                    towards:'row',
                    src: "",
                    value: ""
                },
                // {
                //     name: "包名",
                //     type: "VInput",
                //     model: "jarpath",
                //     towards:'row',
                //     src: "",
                //     value: ""
                // },
                {
                    name: "分组",
                    type: "VSelect",
                    model: "groupid",
                    towards:'row',
                    src:
                        "/myworknote/alg/queryAlgGroup?age=1",
                    value: ""
                },
                {
                    name: "描述信息",
                    type: "VTextarea",
                    model: "description",
                    towards:'row',
                    src: "",
                    value: ""
                },
                {
                    name: "算法包",
                    type: "VFileload",
                    model: "jarpath",
                    towards:'row',
                    src: "",
                    value: ""
                }
            ],
            middle: {
                name: "",
                type: "VDropFileupload",
                model: "algJarPath",
                towards:'row',
                src: "",
                value: ""
            },
            left: `备注:1,算法基础信息中的分组为选择的分组算法包为文件上传,只能有一个,依赖包可以有n个(0到正无穷)<br>
            2,输入端口、输出端口、参数,都是可以添力多个的,注意后面有一个“+”号,点击这个,往下面,或者往右衍伸,增加一个输入框,<br>
            3,输入,输出端口中的数据类型也是选择的,现在默认只有一个" dataset,<br>
            4.参数中的展示类型,目前包含,“文本框”,“下拉框”,“多选框”,“列选择”,“日期选择”,后面的高级配置为用于对这些展示类型进行补充的,<br>
            5.可用操作,目前只有一个查看中间临时数据,后续会增加`
        },
        {
            name: "输入端口",
            type: "input",
            add: true,
            components: [
                {
                    name: "端口名",
                    type: "VInput",
                    model: "partname",
                    towards:'col',
                    src: "",
                    value: ""
                },
                {
                    name: "数据类型",
                    type: "VSelect",
                    model: "datatype",
                    towards:'col',
                    src: "",
                    value: ""
                },
                {
                    name: "方法名",
                    type: "VInput",
                    model: "method",
                    towards:'col',
                    src: "",
                    value: ""
                },
                {
                    name: "列选择方法名",
                    type: "VInput",
                    model: "columnmethod",
                    towards:'col',
                    src: "",
                    value: ""
                }
            ]
        },
        {
            name: "输出端口",
            type: "output",
            add: true,
            components: [
                {
                    name: "端口名",
                    type: "VInput",
                    model: "portname",
                    towards:'col',
                    src: "",
                    value: ""
                },
                {
                    name: "数据类型",
                    type: "VSelect",
                    model: "datatype",
                    towards:'col',
                    src: "",
                    value: ""
                },
                {
                    name: "方法名",
                    type: "VInput",
                    model: "method",
                    towards:'col',
                    src: "",
                    value: ""
                },
                {
                    name: "列选择方法名",
                    type: "VInput",
                    model: "columnmethod",
                    towards:'col',
                    src: "",
                    value: ""
                }
            ]
        },
        {
            name: "参数",
            type: "parmas",
            add: true,
            components: [
                {
                    name: "参数名",
                    type: "VInput",
                    model: "name",
                    towards:'col',
                    src: "",
                    value: ""
                },
                {
                    name: "展示名",
                    type: "VInput",
                    model: "label",
                    towards:'col',
                    src: "",
                    value: ""
                },
                {
                    name: "默认值",
                    type: "VInput",
                    model: "defaultvalue",
                    towards:'col',
                    src: "",
                    value: ""
                },
                {
                    name: "描述",
                    type: "VTextarea",
                    model: "description",
                    towards:'col',
                    src: "",
                    value: ""
                },
                {
                    name: "展示类型",
                    type: "VSelect",
                    model: "uitype",
                    towards:'col',
                    src: "",
                    value: ""
                },
                {
                    name: "高级配置",
                    type: "VTextarea",
                    model: "highCfg",
                    towards:'col',
                    src: "",
                    value: ""
                }
            ]
        },
        {
            name: "可用操作",
            type: "handles",
            components: [
                {
                    name: "查看结果数据",
                    type: "VRadiogroup",
                    model: "check",
                    src: "",
                    value: ""
                }
            ]
        }
    ]
};
