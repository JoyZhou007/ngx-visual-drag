// 公共样式
const commonStyle = {
    rotate: '',
    opacity: 1,
};
// 编辑器左侧组件列表
const list = [
    {
        component: 'v-text',
        label: '文字',
        propValue: '文字',
        icon: 'el-icon-edit',
        animations: [],
        events: {},
        style: {
            width: 200,
            height: 33,
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: '',
            color: '',
        },
    },
    {
        component: 'v-button',
        label: '按钮',
        propValue: '按钮',
        icon: 'el-icon-thumb',
        animations: [],
        events: {},
        style: {
            width: 100,
            height: 34,
            borderWidth: '',
            borderColor: '',
            borderRadius: '',
            fontSize: 14,
            fontWeight: 500,
            lineHeight: '',
            letterSpacing: 0,
            textAlign: '',
            color: '',
            backgroundColor: '',
        },
    },
    {
        component: 'Picture',
        label: '图片',
        icon: 'el-icon-picture',
        propValue: './../../assets/title.jpg',
        animations: [],
        events: {},
        style: {
            width: 300,
            height: 200,
            borderRadius: '',
        },
    },
];
list.forEach((item) => {
    item.style = Object.assign(Object.assign({}, item.style), commonStyle);
});
export default list;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LWxpc3QuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vcHJvamVjdHMvbmd4LXZpc3VhbC1kcmFnL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL2N1c3RvbS1jb21wb25lbnQvY29tcG9uZW50LWxpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTztBQUNQLE1BQU0sV0FBVyxHQUFHO0lBQ2xCLE1BQU0sRUFBRSxFQUFFO0lBQ1YsT0FBTyxFQUFFLENBQUM7Q0FDWCxDQUFDO0FBRUYsWUFBWTtBQUNaLE1BQU0sSUFBSSxHQUFHO0lBQ1g7UUFDRSxTQUFTLEVBQUUsUUFBUTtRQUNuQixLQUFLLEVBQUUsSUFBSTtRQUNYLFNBQVMsRUFBRSxJQUFJO1FBQ2YsSUFBSSxFQUFFLGNBQWM7UUFDcEIsVUFBVSxFQUFFLEVBQUU7UUFDZCxNQUFNLEVBQUUsRUFBRTtRQUNWLEtBQUssRUFBRTtZQUNMLEtBQUssRUFBRSxHQUFHO1lBQ1YsTUFBTSxFQUFFLEVBQUU7WUFDVixRQUFRLEVBQUUsRUFBRTtZQUNaLFVBQVUsRUFBRSxHQUFHO1lBQ2YsVUFBVSxFQUFFLEVBQUU7WUFDZCxhQUFhLEVBQUUsQ0FBQztZQUNoQixTQUFTLEVBQUUsRUFBRTtZQUNiLEtBQUssRUFBRSxFQUFFO1NBQ1Y7S0FDRjtJQUNEO1FBQ0UsU0FBUyxFQUFFLFVBQVU7UUFDckIsS0FBSyxFQUFFLElBQUk7UUFDWCxTQUFTLEVBQUUsSUFBSTtRQUNmLElBQUksRUFBRSxlQUFlO1FBQ3JCLFVBQVUsRUFBRSxFQUFFO1FBQ2QsTUFBTSxFQUFFLEVBQUU7UUFDVixLQUFLLEVBQUU7WUFDTCxLQUFLLEVBQUUsR0FBRztZQUNWLE1BQU0sRUFBRSxFQUFFO1lBQ1YsV0FBVyxFQUFFLEVBQUU7WUFDZixXQUFXLEVBQUUsRUFBRTtZQUNmLFlBQVksRUFBRSxFQUFFO1lBQ2hCLFFBQVEsRUFBRSxFQUFFO1lBQ1osVUFBVSxFQUFFLEdBQUc7WUFDZixVQUFVLEVBQUUsRUFBRTtZQUNkLGFBQWEsRUFBRSxDQUFDO1lBQ2hCLFNBQVMsRUFBRSxFQUFFO1lBQ2IsS0FBSyxFQUFFLEVBQUU7WUFDVCxlQUFlLEVBQUUsRUFBRTtTQUNwQjtLQUNGO0lBQ0Q7UUFDRSxTQUFTLEVBQUUsU0FBUztRQUNwQixLQUFLLEVBQUUsSUFBSTtRQUNYLElBQUksRUFBRSxpQkFBaUI7UUFDdkIsU0FBUyxFQUFFLDBCQUEwQjtRQUNyQyxVQUFVLEVBQUUsRUFBRTtRQUNkLE1BQU0sRUFBRSxFQUFFO1FBQ1YsS0FBSyxFQUFFO1lBQ0wsS0FBSyxFQUFFLEdBQUc7WUFDVixNQUFNLEVBQUUsR0FBRztZQUNYLFlBQVksRUFBRSxFQUFFO1NBQ2pCO0tBQ0Y7Q0FDRixDQUFDO0FBRUYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO0lBQ3BCLElBQUksQ0FBQyxLQUFLLG1DQUFRLElBQUksQ0FBQyxLQUFLLEdBQUssV0FBVyxDQUFFLENBQUM7QUFDakQsQ0FBQyxDQUFDLENBQUM7QUFFSCxlQUFlLElBQUksQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIOWFrOWFseagt+W8j1xyXG5jb25zdCBjb21tb25TdHlsZSA9IHtcclxuICByb3RhdGU6ICcnLFxyXG4gIG9wYWNpdHk6IDEsXHJcbn07XHJcblxyXG4vLyDnvJbovpHlmajlt6bkvqfnu4Tku7bliJfooahcclxuY29uc3QgbGlzdCA9IFtcclxuICB7XHJcbiAgICBjb21wb25lbnQ6ICd2LXRleHQnLFxyXG4gICAgbGFiZWw6ICfmloflrZcnLFxyXG4gICAgcHJvcFZhbHVlOiAn5paH5a2XJyxcclxuICAgIGljb246ICdlbC1pY29uLWVkaXQnLFxyXG4gICAgYW5pbWF0aW9uczogW10sXHJcbiAgICBldmVudHM6IHt9LFxyXG4gICAgc3R5bGU6IHtcclxuICAgICAgd2lkdGg6IDIwMCxcclxuICAgICAgaGVpZ2h0OiAzMyxcclxuICAgICAgZm9udFNpemU6IDE0LFxyXG4gICAgICBmb250V2VpZ2h0OiA1MDAsXHJcbiAgICAgIGxpbmVIZWlnaHQ6ICcnLFxyXG4gICAgICBsZXR0ZXJTcGFjaW5nOiAwLFxyXG4gICAgICB0ZXh0QWxpZ246ICcnLFxyXG4gICAgICBjb2xvcjogJycsXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAge1xyXG4gICAgY29tcG9uZW50OiAndi1idXR0b24nLFxyXG4gICAgbGFiZWw6ICfmjInpkq4nLFxyXG4gICAgcHJvcFZhbHVlOiAn5oyJ6ZKuJyxcclxuICAgIGljb246ICdlbC1pY29uLXRodW1iJyxcclxuICAgIGFuaW1hdGlvbnM6IFtdLFxyXG4gICAgZXZlbnRzOiB7fSxcclxuICAgIHN0eWxlOiB7XHJcbiAgICAgIHdpZHRoOiAxMDAsXHJcbiAgICAgIGhlaWdodDogMzQsXHJcbiAgICAgIGJvcmRlcldpZHRoOiAnJyxcclxuICAgICAgYm9yZGVyQ29sb3I6ICcnLFxyXG4gICAgICBib3JkZXJSYWRpdXM6ICcnLFxyXG4gICAgICBmb250U2l6ZTogMTQsXHJcbiAgICAgIGZvbnRXZWlnaHQ6IDUwMCxcclxuICAgICAgbGluZUhlaWdodDogJycsXHJcbiAgICAgIGxldHRlclNwYWNpbmc6IDAsXHJcbiAgICAgIHRleHRBbGlnbjogJycsXHJcbiAgICAgIGNvbG9yOiAnJyxcclxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnJyxcclxuICAgIH0sXHJcbiAgfSxcclxuICB7XHJcbiAgICBjb21wb25lbnQ6ICdQaWN0dXJlJyxcclxuICAgIGxhYmVsOiAn5Zu+54mHJyxcclxuICAgIGljb246ICdlbC1pY29uLXBpY3R1cmUnLFxyXG4gICAgcHJvcFZhbHVlOiAnLi8uLi8uLi9hc3NldHMvdGl0bGUuanBnJyxcclxuICAgIGFuaW1hdGlvbnM6IFtdLFxyXG4gICAgZXZlbnRzOiB7fSxcclxuICAgIHN0eWxlOiB7XHJcbiAgICAgIHdpZHRoOiAzMDAsXHJcbiAgICAgIGhlaWdodDogMjAwLFxyXG4gICAgICBib3JkZXJSYWRpdXM6ICcnLFxyXG4gICAgfSxcclxuICB9LFxyXG5dO1xyXG5cclxubGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgaXRlbS5zdHlsZSA9IHsgLi4uaXRlbS5zdHlsZSwgLi4uY29tbW9uU3R5bGUgfTtcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBsaXN0O1xyXG4iXX0=