var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": ""
},

{
    "location": "index.html#Documentation-1",
    "page": "Home",
    "title": "Documentation",
    "category": "section",
    "text": "This package provides an implementation of an observable in a Markov Chain Monte Carlo simulation context (like MonteCarlo.jl).During a Markov chain Monte Carlo simulation a Markov walker (after thermalization) walks through configuration space according to the equilibrium distribution. Typically, one measures observables along the Markov path, records the results, and in the end averages the measurements. MonteCarloObservable.jl provides all the necessary tools for conveniently conducting these types of measurements, including estimation of one-sigma error bars through binning or jackknife analysis."
},

{
    "location": "manual/gettingstarted.html#",
    "page": "Getting started",
    "title": "Getting started",
    "category": "page",
    "text": ""
},

{
    "location": "manual/gettingstarted.html#Manual-1",
    "page": "Getting started",
    "title": "Manual",
    "category": "section",
    "text": ""
},

{
    "location": "manual/gettingstarted.html#Installation-/-Updating-1",
    "page": "Getting started",
    "title": "Installation / Updating",
    "category": "section",
    "text": "To install the package execute the following command in the REPL:Pkg.clone(\"https://github.com/crstnbr/MonteCarloObservable.jl\")To obtain the latest version of the package just do Pkg.update() or specifically Pkg.update(\"MonteCarloObservable\")."
},

{
    "location": "manual/gettingstarted.html#Example-1",
    "page": "Getting started",
    "title": "Example",
    "category": "section",
    "text": "This is a simple demontration of how to use the package for measuring a floating point observable:using MonteCarloObservable\nobs = Observable(Float64, \"myobservable\")\nadd!(obs, 1.23) # add measurement\nobs\npush!(obs, rand(4)) # same as add!\nlength(obs)\ntimeseries(obs)\nobs[3] # conventional element accessing\nobs[end-2:end]\nadd!(obs, rand(995))\nmean(obs)\nstd(obs) # one-sigma error of mean (binning analysis)\nsaveobs(obs, \"myobservable.jld\")TODO: mention alloc keyword and importance of preallocation."
},

{
    "location": "manual/meantype.html#",
    "page": "Type of the mean",
    "title": "Type of the mean",
    "category": "page",
    "text": ""
},

{
    "location": "manual/meantype.html#Manual-1",
    "page": "Type of the mean",
    "title": "Manual",
    "category": "section",
    "text": ""
},

{
    "location": "manual/meantype.html#Issue-1",
    "page": "Type of the mean",
    "title": "Issue",
    "category": "section",
    "text": "Let\'s assume you have an observable of type Int. You want to add the following measurements to your observable:x = Int[44, -70, 14, -32, 18]The mean of the observable should afterwards be mean(x) == -5.2. Note that this value, -5.2, exceeds the type Int. Explicitly we can see this if we try to convert it to Int:julia> convert(Int, mean(x))\nERROR: InexactError()\nStacktrace:\n [1] convert(::Type{Int}, ::Float64) at .\\float.jl:679This is, of course, not a particularity of the type Int but happens for many (discrete) data types."
},

{
    "location": "manual/meantype.html#Default-1",
    "page": "Type of the mean",
    "title": "Default",
    "category": "section",
    "text": "Let us try the above example explicitly. We create an integer observable,julia> myobs = Observable(Int, \"My Observable\");and add the measurements,julia> add!(myobs, Int[44, -70, 14, -32, 18]);Let\'s see what we get for the meanjulia> mean(myobs)\n-5.2So apparently the package handles the above issue.How does it do it? Basically it applies a heuristic for setting a resonable type for the mean. It creates an array (or number) of the same dimensionality as a measurement and takes, depending on wether the element type is real or complex, either the type Float64 or Complex128 as element type for the mean. For the above example we can check this, typeof(mean(myobs)) == Float64."
},

{
    "location": "manual/meantype.html#meantype-keyword-1",
    "page": "Type of the mean",
    "title": "meantype keyword",
    "category": "section",
    "text": "The above heuristic should be reasonable for most cases. However, if it isn\'t you can set the type of the mean explicitly via the keyword meantype. Example:julia> myobs = Observable(Int, \"My Observable\", meantype=Float32);\n\njulia> add!(myobs, Int[44, -70, 14, -32, 18]);\n\njulia> typeof(mean(myobs)) == Float32"
},

{
    "location": "manual/errorestimation.html#",
    "page": "Error estimation",
    "title": "Error estimation",
    "category": "page",
    "text": ""
},

{
    "location": "manual/errorestimation.html#Error-estimation-1",
    "page": "Error estimation",
    "title": "Error estimation",
    "category": "section",
    "text": "The automatic estimation of error bars (one-sigma confidence intervals) is outsourced in the package ErrorAnalysis.jl."
},

{
    "location": "manual/errorestimation.html#Binning-analysis-1",
    "page": "Error estimation",
    "title": "Binning analysis",
    "category": "section",
    "text": "For N uncorrelated measurements of an observable O the statistical error sigma, the root-mean-square deviation of the time series mean from the true expectation value, falls off with the number of measurements N according tosigma = fracsigma_OsqrtNwhere sigma_O is the standard deviation of the observable O.In a Markov chain Monte Carlo sampling, however, measurements are usually correlated due to the fact that the next step of the Markov walker depends on his current position in configuration space. One way to estimate the statistical error in this case is by binning analysis. The idea is to partition the time series into bins of a fixed size large enough such that neighboring bins are uncorrelated, that is there means are uncorrelated. For this procedure to be reliable we need both a large bin size (larger than the Markov time scale of correlations, typically called autocorrelation time) and many bins (to suppress statistical fluctuations).In principle, what one should do is look at the estimate for the statistical error as a function of bin size and expect a plateau (convergence of the estimate). However, finding a plateau (with fluctuations) numerically in an automated manner is difficult. Instead we simply always partition the time series into 32 bins what is generally considered a large sample by statisticians. The more data we add the larger the bin size and the better the error estimate.From this we conclude that estimates for the error only become reliable in the limit of many measurements."
},

{
    "location": "manual/errorestimation.html#Resources-1",
    "page": "Error estimation",
    "title": "Resources",
    "category": "section",
    "text": "J. Gubernatis, N. Kawashima, and P. Werner, Quantum Monte Carlo Methods: Algorithms for Lattice Models, Book (2016)V. Ambegaokar, and M. Troyer, Estimating errors reliably in Monte Carlo simulations of the Ehrenfest model, American Journal of Physics 78, 150 (2010)"
},

{
    "location": "manual/memdisk.html#",
    "page": "Memory / disk storage",
    "title": "Memory / disk storage",
    "category": "page",
    "text": ""
},

{
    "location": "manual/memdisk.html#Memory-/-disk-storage-1",
    "page": "Memory / disk storage",
    "title": "Memory / disk storage",
    "category": "section",
    "text": "By default the full Monte Carlo time series of an observable is kept in memory. This is the most convenient option as it renders element access and error computation fast. However, one can think of at least two scenarios in which it might be preferable to track the time series on disk rather than in memory:Abrupt termination: the simulation might be computationally expensive, thus slow, and might abort abruptly (maybe due to cluster outage or time limit). In this case, one probably wants to have a restorable \"memory dump\" of the so far recorded measurements to not have to restart from scratch.\nMemory limit: the tracked observable might be large, i.e. a large complex matrix. Then, storing a long time series might make the simulation exceed a memory limit (and often stop unexpectedly). Keeping the time series memory on disk solves this problem.As we show below, MonteCarloObservable.jl allows you to handle those cases by keeping the time series on disk.note: Note\nOne can always save the full observable object (saveobs) or export the time series to disk (export_result with timeseries=true). This section is about the (internal) temporary storage of the time series during simulation. If you will, you can think of in-memory observables (default) and \"disk observables\" (this section)."
},

{
    "location": "manual/memdisk.html#\"Disk-observables\"-1",
    "page": "Memory / disk storage",
    "title": "\"Disk observables\"",
    "category": "section",
    "text": "You can create a \"disk observable\" that every once in a while dumps it\'s time series memory to disk as follows:obs = Observable(Float64, \"myobservable\"; inmemory=false, alloc=100)It will record measurements in memory until the preallocated time series buffer (alloc=100) overflows in which case it will save the observables memory to JLD file (outfile). In the above example this will thus happen for the first time after 100 measurements.Apart from the special initialization (inmemory=false) basically everything else stays the same as for an in-memory observable. For example, we can still get the mean via mean(obs), access time series elements with obs[idx] and load the full time series to memory at any point via timeseries(obs). However, because of now necessary disk operations same functionality might be slightly slower for those \"disk observables\".The observable\'s memory dump contains meta information, like name, element type, element size etc., as well as time series memory chunks. The dumping is implemented in the not exported method MonteCarloObservable.updateondisk. Note that the observable\'s memory is not a full backup of the observable itself (see saveobs). Should the simulation terminate abruptly one can nonetheless restore most of the so-far recorded information using loadobs_frommemory and timeseries_frommemory. Measurements that haven\'t been dumped yet, because they are still lying in the preallocated buffer, are lost though. Please also note that the structure of the dump of an observable\'s memory might change in future versions."
},

{
    "location": "methods/general.html#",
    "page": "General",
    "title": "General",
    "category": "page",
    "text": ""
},

{
    "location": "methods/general.html#Methods:-General-1",
    "page": "General",
    "title": "Methods: General",
    "category": "section",
    "text": "Below you find all general exports."
},

{
    "location": "methods/general.html#Index-1",
    "page": "General",
    "title": "Index",
    "category": "section",
    "text": "Pages = [\"general.md\"]"
},

{
    "location": "methods/general.html#MonteCarloObservable.Observable-Tuple{DataType,String}",
    "page": "General",
    "title": "MonteCarloObservable.Observable",
    "category": "method",
    "text": "Observable(t, name; keyargs...)\n\nCreate an observable of type t.\n\nThe following keywords are allowed:\n\nalloc: preallocated size of time series container\noutfile: default HDF5/JLD output file for io operations\ndataset: target path within outfile\ninmemory: wether to keep the time series in memory or on disk\nmeantype: type of the mean (should be compatible with measurement type t)\n\nSee also Observable.\n\n\n\n"
},

{
    "location": "methods/general.html#Base.Distributed.clear!-Union{Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number}}, Tuple{T}} where T",
    "page": "General",
    "title": "Base.Distributed.clear!",
    "category": "method",
    "text": "clear!(obs::Observable{T})\n\nClears all measurement information in obs. Identical to init! and reset!.\n\n\n\n"
},

{
    "location": "methods/general.html#Base.eltype-Union{Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number}}, Tuple{T}} where T",
    "page": "General",
    "title": "Base.eltype",
    "category": "method",
    "text": "eltype(obs::Observable{T})\n\nReturns the type T of a measurment of the observable.\n\n\n\n"
},

{
    "location": "methods/general.html#Base.getindex-Union{Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number},Vararg{Any,N} where N}, Tuple{T}} where T",
    "page": "General",
    "title": "Base.getindex",
    "category": "method",
    "text": "getindex(obs::Observable{T}, args...)\n\nGet an element of the measurement time series of the observable.\n\n\n\n"
},

{
    "location": "methods/general.html#Base.isempty-Union{Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number}}, Tuple{T}} where T",
    "page": "General",
    "title": "Base.isempty",
    "category": "method",
    "text": "isempty(obs::Observable{T})\n\nDetermine wether the observable hasn\'t been measured yet.\n\n\n\n"
},

{
    "location": "methods/general.html#Base.length-Union{Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number}}, Tuple{T}} where T",
    "page": "General",
    "title": "Base.length",
    "category": "method",
    "text": "length(obs::Observable{T})\n\nNumber of measurements of the observable.\n\n\n\n"
},

{
    "location": "methods/general.html#Base.ndims-Union{Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number}}, Tuple{T}} where T",
    "page": "General",
    "title": "Base.ndims",
    "category": "method",
    "text": "ndims(obs::Observable{T})\n\nNumber of dimensions of the observable (of one measurement).\n\nEquivalent to ndims(T).\n\n\n\n"
},

{
    "location": "methods/general.html#Base.push!-Union{Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number},AbstractArray{T,N} where N}, Tuple{T}} where T",
    "page": "General",
    "title": "Base.push!",
    "category": "method",
    "text": "push!(obs::Observable{T}, measurements::AbstractArray{T}; verbose=false)\n\nAdd multiple measurements to observable obs. Note that because of preallocation this isn\'t really a push.\n\n\n\n"
},

{
    "location": "methods/general.html#Base.push!-Union{Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number},T}, Tuple{T}} where T",
    "page": "General",
    "title": "Base.push!",
    "category": "method",
    "text": "push!(obs::Observable{T}, measurement::T; verbose=false)\n\nAdd a measurement to observable obs. Note that because of preallocation this isn\'t really a push.\n\n\n\n"
},

{
    "location": "methods/general.html#Base.size-Union{Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number}}, Tuple{T}} where T",
    "page": "General",
    "title": "Base.size",
    "category": "method",
    "text": "size(obs::Observable{T})\n\nSize of the observable (of one measurement).\n\n\n\n"
},

{
    "location": "methods/general.html#Base.view-Union{Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number},Vararg{Any,N} where N}, Tuple{T}} where T",
    "page": "General",
    "title": "Base.view",
    "category": "method",
    "text": "view(obs::Observable{T}, args...)\n\nGet a view into the measurement time series of the observable.\n\n\n\n"
},

{
    "location": "methods/general.html#MonteCarloObservable.add!-Union{Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number},AbstractArray{T,N} where N}, Tuple{T}} where T",
    "page": "General",
    "title": "MonteCarloObservable.add!",
    "category": "method",
    "text": "add!(obs::Observable{T}, measurements::AbstractArray{T}; verbose=false)\n\nAdd multiple measurements to observable obs.\n\n\n\n"
},

{
    "location": "methods/general.html#MonteCarloObservable.add!-Union{Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number},T}, Tuple{T}} where T",
    "page": "General",
    "title": "MonteCarloObservable.add!",
    "category": "method",
    "text": "add!(obs::Observable{T}, measurement::T; verbose=false)\n\nAdd a measurement to observable obs.\n\n\n\n"
},

{
    "location": "methods/general.html#MonteCarloObservable.inmemory-Union{Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number}}, Tuple{T}} where T",
    "page": "General",
    "title": "MonteCarloObservable.inmemory",
    "category": "method",
    "text": "inmemory(obs::Observable{T})\n\nChecks wether the observable is kept in memory (vs. on disk).\n\n\n\n"
},

{
    "location": "methods/general.html#MonteCarloObservable.name-Union{Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number}}, Tuple{T}} where T",
    "page": "General",
    "title": "MonteCarloObservable.name",
    "category": "method",
    "text": "name(obs::Observable{T})\n\nReturns the name of the observable.\n\n\n\n"
},

{
    "location": "methods/general.html#MonteCarloObservable.rename-Union{Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number},AbstractString}, Tuple{T}} where T",
    "page": "General",
    "title": "MonteCarloObservable.rename",
    "category": "method",
    "text": "rename(obs::Observable{T}, name)\n\nRenames the observable.\n\n\n\n"
},

{
    "location": "methods/general.html#MonteCarloObservable.reset!-Union{Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number}}, Tuple{T}} where T",
    "page": "General",
    "title": "MonteCarloObservable.reset!",
    "category": "method",
    "text": "reset!(obs::Observable{T})\n\nResets all measurement information in obs. Identical to init! and clear!.\n\n\n\n"
},

{
    "location": "methods/general.html#MonteCarloObservable.timeseries-Union{Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number}}, Tuple{T}} where T",
    "page": "General",
    "title": "MonteCarloObservable.timeseries",
    "category": "method",
    "text": "timeseries(obs::Observable{T})\n\nReturns the measurement time series of an observable.\n\nIf inmemory(obs) == false it will read the time series from disk and thus might take some time.\n\nSee also getindex and view.\n\n\n\n"
},

{
    "location": "methods/general.html#Documentation-1",
    "page": "General",
    "title": "Documentation",
    "category": "section",
    "text": "Modules = [MonteCarloObservable]\nPrivate = false\nOrder   = [:function, :type]\nPages = [\"type.jl\", \"interface.jl\"]"
},

{
    "location": "methods/statistics.html#",
    "page": "Statistics",
    "title": "Statistics",
    "category": "page",
    "text": ""
},

{
    "location": "methods/statistics.html#Methods:-Statistics-1",
    "page": "Statistics",
    "title": "Methods: Statistics",
    "category": "section",
    "text": "Below you find all statistics related exports."
},

{
    "location": "methods/statistics.html#Index-1",
    "page": "Statistics",
    "title": "Index",
    "category": "section",
    "text": "Pages = [\"statistics.md\"]"
},

{
    "location": "methods/statistics.html#Base.mean-Union{Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number}}, Tuple{T}} where T",
    "page": "Statistics",
    "title": "Base.mean",
    "category": "method",
    "text": "mean(obs::Observable{T})\n\nEstimate of the mean of the observable.\n\n\n\n"
},

{
    "location": "methods/statistics.html#Base.std-Union{Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number}}, Tuple{T}} where T",
    "page": "Statistics",
    "title": "Base.std",
    "category": "method",
    "text": "std(obs::Observable{T})\n\nEstimate of the standard deviation (one-sigma error) of the mean. Respects correlations between measurements through binning analysis.\n\nNote that this is not the same as Base.std(timeseries(obs)), not even  for uncorrelated measurements.\n\nCorresponds to the square root of var(obs). See also mean(obs).\n\n\n\n"
},

{
    "location": "methods/statistics.html#Base.var-Union{Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number}}, Tuple{T}} where T",
    "page": "Statistics",
    "title": "Base.var",
    "category": "method",
    "text": "var(obs::Observable{T})\n\nEstimate of the variance of the mean. Respects correlations between measurements through binning analysis.\n\nNote that this is not the same as Base.var(timeseries(obs)), not even  for uncorrelated measurements.\n\nCorresponds to the square of std(obs). See also mean(obs).\n\n\n\n"
},

{
    "location": "methods/statistics.html#ErrorAnalysis.binning_error-Union{Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number},Vararg{Any,N} where N}, Tuple{T}} where T",
    "page": "Statistics",
    "title": "ErrorAnalysis.binning_error",
    "category": "method",
    "text": "binning_error(obs::Observable{T}[; binsize=0, warnings=false])\n\nCalculates statistical one-sigma error (eff. standard deviation) for correlated data. How: Binning of data and assuming statistical independence of bins (i.e. R plateau has been reached). (Eq. 3.18 of Book basically)\n\nThe default binsize=0 indicates automatic binning.\n\n\n\n"
},

{
    "location": "methods/statistics.html#ErrorAnalysis.jackknife_error-Union{Tuple{Function,MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number},Vararg{Any,N} where N}, Tuple{T}} where T",
    "page": "Statistics",
    "title": "ErrorAnalysis.jackknife_error",
    "category": "method",
    "text": "jackknife_error(g::Function, obs::Observable{T}; [binsize=10])\n\nComputes the jackknife standard deviation of g(<obs>) by binning the observable\'s time series and performing leave-one-out analysis.\n\n\n\n"
},

{
    "location": "methods/statistics.html#Documentation-1",
    "page": "Statistics",
    "title": "Documentation",
    "category": "section",
    "text": "Modules = [MonteCarloObservable, ErrorAnalysis]\nPrivate = false\nOrder   = [:function]\nPages = [\"statistics.jl\"]"
},

{
    "location": "methods/io.html#",
    "page": "IO",
    "title": "IO",
    "category": "page",
    "text": ""
},

{
    "location": "methods/io.html#Methods:-IO-1",
    "page": "IO",
    "title": "Methods: IO",
    "category": "section",
    "text": "Below you find all IO related exports."
},

{
    "location": "methods/io.html#Index-1",
    "page": "IO",
    "title": "Index",
    "category": "section",
    "text": "Pages = [\"io.md\"]"
},

{
    "location": "methods/io.html#MonteCarloObservable.export_result-Union{Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number},AbstractString,AbstractString}, Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number},AbstractString}, Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number}}, Tuple{T}} where T",
    "page": "IO",
    "title": "MonteCarloObservable.export_result",
    "category": "method",
    "text": "export_results(obs::Observable{T}[, filename::AbstractString, entryname::AbstractString; timeseries::Bool=false])\n\nExport result for given observable nicely to JLD.\n\nWill export name, number of measurements, estimates for mean and one-sigma error (standard deviation). Optionally (timeseries==true) exports the full time series as well.\n\n\n\n"
},

{
    "location": "methods/io.html#MonteCarloObservable.loadobs-Tuple{AbstractString,AbstractString}",
    "page": "IO",
    "title": "MonteCarloObservable.loadobs",
    "category": "method",
    "text": "loadobs(filename::AbstractString, entryname::AbstractString)\n\nLoad complete representation of an observable from JLD file.\n\nSee also saveobs.\n\n\n\n"
},

{
    "location": "methods/io.html#MonteCarloObservable.loadobs_frommemory-Tuple{AbstractString,AbstractString}",
    "page": "IO",
    "title": "MonteCarloObservable.loadobs_frommemory",
    "category": "method",
    "text": "loadobs_frommemory(filename::AbstractString, group::AbstractString)\n\nCreate an observable based on memory dump (inmemory==false).\n\n\n\n"
},

{
    "location": "methods/io.html#MonteCarloObservable.saveobs-Union{Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number},AbstractString,AbstractString}, Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number},AbstractString}, Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number}}, Tuple{T}} where T",
    "page": "IO",
    "title": "MonteCarloObservable.saveobs",
    "category": "method",
    "text": "saveobs(obs::Observable{T}[, filename::AbstractString, entryname::AbstractString])\n\nSaves complete representation of the observable to JLD file.\n\nDefault filename is \"Observables.jld\" and default entryname is name(obs).\n\nSee also loadobs.\n\n\n\n"
},

{
    "location": "methods/io.html#MonteCarloObservable.timeseries_frommemory-Tuple{AbstractString,AbstractString}",
    "page": "IO",
    "title": "MonteCarloObservable.timeseries_frommemory",
    "category": "method",
    "text": "timeseries_frommemory(filename::AbstractString, group::AbstractString)\n\nLoad time series from memory dump (inmemory==false) in HDF5/JLD file.\n\nWill load and concatenate time series chunks. Output will be a vector of measurements.\n\n\n\n"
},

{
    "location": "methods/io.html#MonteCarloObservable.timeseries_frommemory_flat-Tuple{AbstractString,AbstractString}",
    "page": "IO",
    "title": "MonteCarloObservable.timeseries_frommemory_flat",
    "category": "method",
    "text": "timeseries_frommemory_flat(filename::AbstractString, group::AbstractString)\n\nLoad time series from memory dump (inmemory==false) in HDF5/JLD file.\n\nWill load and concatenate time series chunks. Output will be higher-dimensional array whose last dimension corresponds to Monte Carlo time.\n\n\n\n"
},

{
    "location": "methods/io.html#Documentation-1",
    "page": "IO",
    "title": "Documentation",
    "category": "section",
    "text": "Modules = [MonteCarloObservable]\nPrivate = false\nOrder   = [:function]\nPages = [\"io.jl\"]"
},

{
    "location": "methods/plotting.html#",
    "page": "Plotting",
    "title": "Plotting",
    "category": "page",
    "text": ""
},

{
    "location": "methods/plotting.html#Methods:-Statistics-1",
    "page": "Plotting",
    "title": "Methods: Statistics",
    "category": "section",
    "text": "Below you find all plotting related exports."
},

{
    "location": "methods/plotting.html#Index-1",
    "page": "Plotting",
    "title": "Index",
    "category": "section",
    "text": "Pages = [\"plotting.md\"]"
},

{
    "location": "methods/plotting.html#MonteCarloObservable.binningplot-Union{Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number}}, Tuple{T}} where T",
    "page": "Plotting",
    "title": "MonteCarloObservable.binningplot",
    "category": "method",
    "text": "binningplot(obs::Observable{T})\n\nCreates a plot of the binning error coefficient R as a function of bin size.\n\nThe coefficient R should (up to statistical fluctuations) show a plateau for larger bin sizes, indicating that the bin averages have become independent. For correlated data one has R>≈1 and sqrt(R) quantifies how much one would have underestimated the one-sigma errorbar.\n\nSee binning_error.\n\n\n\n"
},

{
    "location": "methods/plotting.html#MonteCarloObservable.corrplot-Union{Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number}}, Tuple{T}} where T",
    "page": "Plotting",
    "title": "MonteCarloObservable.corrplot",
    "category": "method",
    "text": "corrplot(obs::Observable{T})\n\nPlot the autocorrelation function of the observable.\n\n\n\n"
},

{
    "location": "methods/plotting.html#MonteCarloObservable.hist-Union{Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number}}, Tuple{T}} where T",
    "page": "Plotting",
    "title": "MonteCarloObservable.hist",
    "category": "method",
    "text": "hist(obs::Observable{T}[; errors=true, digits=3])\n\nPlot a histogram of the observable\'s time series.\n\n\n\n"
},

{
    "location": "methods/plotting.html#PyPlot.plot-Union{Tuple{MonteCarloObservable.Observable{T,MeanType} where MeanType<:Union{Array, Number}}, Tuple{T}} where T",
    "page": "Plotting",
    "title": "PyPlot.plot",
    "category": "method",
    "text": "plot(obs::Observable{T}[; errors=true, digits=3])\n\nPlot the observable\'s time series.\n\n\n\n"
},

{
    "location": "methods/plotting.html#Documentation-1",
    "page": "Plotting",
    "title": "Documentation",
    "category": "section",
    "text": "Modules = [MonteCarloObservable, ErrorAnalysis]\nPrivate = false\nOrder   = [:function]\nPages = [\"plotting.jl\"]"
},

]}
