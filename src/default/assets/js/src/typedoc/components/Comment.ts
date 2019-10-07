/// <reference types='jquery' />
/// <reference types='backbone' />
/// <reference path='../Application.ts' />

namespace typedoc
{
    /**
     * Decorates comment divs.
     */
    class Comment extends Backbone.View<any>
    {
        private host = new URL(location.href).host;

        /**
         * Create a new Comment instance.
         *
         * @param options  Backbone view constructor options.
         */
        constructor(options:Backbone.ViewOptions<any>) {
            super(options);

            this.decorateLinks();
        }

        private decorateLinks() {
            let externalLinks = this.$el.find('a').filter((index: number, element:HTMLElement) => {
                let href = $(element).attr('href');
                if (href) {
                    try {
                        let host = new URL(href).host;
                        return host !== this.host;
                    } catch (e) {
                        // ignore invalid URLs. These could be relative / internal 
                    }
                }
                return false;
            });

            externalLinks.addClass('tsd-external-link');
        }
    }


    /**
     * Register this component.
     */
    registerComponent(Comment, '.tsd-comment');
}
