export default function getStyle(style, filter = []) {
    const needUnit = [
        'fontSize',
        'width',
        'height',
        'top',
        'left',
        'borderWidth',
        'borderRadius',
    ];
    const result = {};
    Object.keys(style).forEach((key) => {
        if (!filter.includes(key)) {
            if (key != 'rotate') {
                result[key] = style[key];
                if (needUnit.includes(key)) {
                    result[key] += 'px';
                }
            }
            else {
                result['transform'] = key + '(' + style[key] + 'deg)';
            }
        }
    });
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGUuanMiLCJzb3VyY2VSb290IjoiLi4vLi4vLi4vcHJvamVjdHMvbmd4LXZpc3VhbC1kcmFnL3NyYy8iLCJzb3VyY2VzIjpbImxpYi91dGlscy9zdHlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsT0FBTyxVQUFVLFFBQVEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxHQUFHLEVBQUU7SUFDakQsTUFBTSxRQUFRLEdBQUc7UUFDZixVQUFVO1FBQ1YsT0FBTztRQUNQLFFBQVE7UUFDUixLQUFLO1FBQ0wsTUFBTTtRQUNOLGFBQWE7UUFDYixjQUFjO0tBQ2YsQ0FBQztJQUVGLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ2pDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3pCLElBQUksR0FBRyxJQUFJLFFBQVEsRUFBRTtnQkFDbkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFekIsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUMxQixNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDO2lCQUNyQjthQUNGO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUM7YUFDdkQ7U0FDRjtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFN0eWxlKHN0eWxlLCBmaWx0ZXIgPSBbXSkge1xyXG4gIGNvbnN0IG5lZWRVbml0ID0gW1xyXG4gICAgJ2ZvbnRTaXplJyxcclxuICAgICd3aWR0aCcsXHJcbiAgICAnaGVpZ2h0JyxcclxuICAgICd0b3AnLFxyXG4gICAgJ2xlZnQnLFxyXG4gICAgJ2JvcmRlcldpZHRoJyxcclxuICAgICdib3JkZXJSYWRpdXMnLFxyXG4gIF07XHJcblxyXG4gIGNvbnN0IHJlc3VsdCA9IHt9O1xyXG4gIE9iamVjdC5rZXlzKHN0eWxlKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgIGlmICghZmlsdGVyLmluY2x1ZGVzKGtleSkpIHtcclxuICAgICAgaWYgKGtleSAhPSAncm90YXRlJykge1xyXG4gICAgICAgIHJlc3VsdFtrZXldID0gc3R5bGVba2V5XTtcclxuXHJcbiAgICAgICAgaWYgKG5lZWRVbml0LmluY2x1ZGVzKGtleSkpIHtcclxuICAgICAgICAgIHJlc3VsdFtrZXldICs9ICdweCc7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3VsdFsndHJhbnNmb3JtJ10gPSBrZXkgKyAnKCcgKyBzdHlsZVtrZXldICsgJ2RlZyknO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn1cclxuIl19