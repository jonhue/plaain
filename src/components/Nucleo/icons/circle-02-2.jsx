<svg height={this.props.height} width={this.props.width} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
	<title>circle 02 2</title>
	<g fill="#ffffff" transform="translate(0.5, 0.5)">
		<g className="nc-loop_circle-02-64">
			<circle cx="32" cy="32" fill="none" opacity="0.4" r="30" stroke="#ffffff" strokeLinecap="round" strokeWidth="3"/>
			<path d="M32,2c16.56854,0,30,13.43146,30,30" fill="none" stroke="#ffffff" strokeLinecap="round" strokeWidth="3"/>
		</g>
		<script>!function(){function t(t){this.element=t,this.animationId,this.start=null,this.init()}if(!window.requestAnimationFrame){var i=null;window.requestAnimationFrame=function(t,n){var e=(new Date).getTime();i||(i=e);var a=Math.max(0,16-(e-i)),o=window.setTimeout(function(){t(e+a)},a);return i=e+a,o}}t.prototype.init=function(){var t=this;this.animationId=window.requestAnimationFrame(t.triggerAnimation.bind(t))},t.prototype.reset=function(){var t=this;window.cancelAnimationFrame(t.animationId)},t.prototype.triggerAnimation=function(t){var i=this;this.start||(this.start=t);var n=t-this.start;504&gt;n||(this.start=this.start+504),this.element.setAttribute("transform","rotate("+Math.min(n/1.4,360)+" 32 32)");if(document.documentElement.contains(this.element))window.requestAnimationFrame(i.triggerAnimation.bind(i))};var n=document.getElementsByClassName("nc-loop_circle-02-64"),e=[];if(n)for(var a=0;n.length&gt;a;a++)!function(i){e.push(new t(n[i]))}(a);document.addEventListener("visibilitychange",function(){"hidden"==document.visibilityState?e.forEach(function(t){t.reset()}):e.forEach(function(t){t.init()})})}();</script>
	</g>
</svg>
