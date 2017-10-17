export default {
    getPropertyValue: function(element, property){
        const elementStyles = window.getComputedStyle(element);
        return elementStyles.getPropertyValue(property);
    },

    getBoundingClientRectExt: function(element){
        const elementStyles = window.getComputedStyle(element);
        const boundingClientRect = element.getBoundingClientRect();

        const margin = {
            top: parseFloat(elementStyles.getPropertyValue('margin-top')),
            right: parseFloat(elementStyles.getPropertyValue('margin-right')),
            bottom: parseFloat(elementStyles.getPropertyValue('margin-bottom')),
            left: parseFloat(elementStyles.getPropertyValue('margin-left'))
        };

        const padding = {
            top: parseFloat(elementStyles.getPropertyValue('padding-top')),
            right: parseFloat(elementStyles.getPropertyValue('padding-right')),
            bottom: parseFloat(elementStyles.getPropertyValue('padding-bottom')),
            left: parseFloat(elementStyles.getPropertyValue('padding-left'))
        };

        boundingClientRect.margin = margin;
        boundingClientRect.padding = padding;

        return boundingClientRect;
    },

    calculateScrollHeight: function(parentNode, node, height = 0, scrollWidth = 0){
        const defaultHeight = height;
        let hasChildNode = false;

        const parentNodeBoundingRectExt = this.getBoundingClientRectExt(parentNode);
        height -= (
            parentNodeBoundingRectExt.padding.top +
            parentNodeBoundingRectExt.padding.bottom +
            parentNodeBoundingRectExt.margin.top +
            parentNodeBoundingRectExt.margin.bottom +
            scrollWidth
        );

        if (!parentNode.hasChildNodes() || parentNode.isEqualNode(node)) {
            return height < 0 ? defaultHeight : height;
        }

        parentNode.childNodes.forEach(function (element) {
            const elementBoundingRectExt = this.getBoundingClientRectExt(element);
            height -= (elementBoundingRectExt.margin.top + elementBoundingRectExt.margin.bottom);

            if(element.contains(node)){
                hasChildNode = true;
                height -= (elementBoundingRectExt.padding.top + elementBoundingRectExt.padding.bottom);
            }else{
                height -= elementBoundingRectExt.height;
            }
        }, this);

        if (!hasChildNode || height < 0) {
            return defaultHeight;
        }

        return height;
    }
};